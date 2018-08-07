const _ = require('lodash');
const axios = require('axios');
const cheerio = require('cheerio');

////////////////////////////////////////////////
// UTILITY FUNCTIONS
////////////////////////////////////////////////


const compose = (...fns) => arg => {
	return _.flattenDeep(fns).reduceRight((current, fn) => {
		if(_.isFunction(fn)) return fn(current);
		throw new TypeError("compose() expects only functions as parameters.");
	}, arg);
};


const composeAsync = (...fns) => arg => {
	return _.flattenDeep(fns).reduceRight(async (current, fn) => {
		if(_.isFunction(fn)) return fn(await current);
		throw new TypeError("compose() expects only functions as parameters.");
	}, arg);
};

const enforceHttpsUrl = url =>
	_.isString(url) ? url.replace(/^(https?:)?\/\//, "https://") : null;

const sanitizeNumber = number =>
	_.isString(number)
    ? number.replace(/[^0-9-.]/g, "")
    : _.isNumber(number) ? number : null;


const withoutNulls = arr =>
	_.isArray(arr) ? arr.filter(val => !_.isNull(val)) : [];

const arrayPairsToObject =  arr =>
	arr.reduce((obj, pair) => ({ ...obj, ...pair }), {});

const fromPairsToObject = compose(arrayPairsToObject, withoutNulls);


const sendResponse = res => async request => {
	return await request
	  .then(data => res.json({status: "success", data}))
	  .catch(({ status: code = 500 }) =>
			res.status(code).json({ status: "failure", code, message: code == 404 ? 'Not found.' : 'Request failed.' })
		);
};

const fetchHtmlFromUrl = async url => {
	return await axios
	.get(enforceHttpsUrl(url))
	.then(response => cheerio.load(response.data))
	.catch(error => {
		error.status = (error.response && error.response.status) || 500;
		throw error;
	});
};



////////////////////////////////////////////////
// HTML PARSING HELPER FUNCTIONS
////////////////////////////////////////////////


const fetchElemInnerText = elem => (elem.text && elem.text().trim()) || null;

const fetchElemAttribute = attribute => elem =>
	(elem.attr && elem.attr(attribute)) || null;


const extractFromElems = extractor => transform => elems => $ => {
	const results = elems.map((i, element) => extractor($(element))).get();
	return _.isFunction(transform) ? transform(results) : results;
};

const extractNumber = compose(parseInt, sanitizeNumber, fetchElemInnerText);

const extractUrlAttribute = attr =>
	compose(enforceHttpsUrl, fetchElemAttribute(attr));

module.exports = {
  compose,
  composeAsync,
  enforceHttpsUrl,
  sanitizeNumber,
  withoutNulls,
  arrayPairsToObject,
  fromPairsToObject,
  sendResponse,
  fetchHtmlFromUrl,
  fetchElemInnerText,
  fetchElemAttribute,
  extractFromElems,
  extractNumber,
  extractUrlAttribute
};
