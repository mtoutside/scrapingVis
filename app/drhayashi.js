const _ = require('lodash');

// Import helper functions
const {
  compose,
  composeAsync,
  extractNumber,
  enforceHttpsUrl,
  fetchHtmlFromUrl,
  extractFromElems,
  fromPairsToObject,
  fetchElemInnerText,
  fetchElemAttribute,
  extractUrlAttribute
} = require("./helpers");
const { tokenizer } = require("./kuromoji.js");

const HAYASHI_BASE = "http://kokoro.squares.net/";

///////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

const scotchRelativeUrl = url =>
	_.isString(url) ? `${HAYASHI_BASE}${url.replace(/^\/*?/, "/")}` : null;

const extractScotchUrlAttribute = attr =>
	compose(enforceHttpsUrl, scotchRelativeUrl, fetchElemAttribute(attr));

///////////////////////////////////////////////////////////////////////////////
// EXTRACTION FUNCTIONS
///////////////////////////////////////////////////////////////////////////////

const extractSocialUrl = elem => {
	const icon = elem.find('span.icon');

	const regex = /^(?:icon|color)-(.+)$/;

	const onlySocialClasses = regex => (classes = '') => classes
	.replace(/\s+/g, '')
	.split('')
	.filter(classname => regex.test(classname));

	const getSocialFromClasses = regex => classes => {
		let social = null;
		const [classname = null] = classes;

		if(_.isString(classname)) {
			const[, name = null] = classname.match(regex);
			social = name ? _.snakeCase(name) : null;
		}

		return social;
	};

	const href = extractUrlAttribute('href')(elem);

	const social = compose(
		getSocialFromClasses(regex),
		onlySocialClasses(regex),
		fetchElemAttribute('class')
	)(icon);

	return social && { [social]: href};
};
/**
 * Extract a single post from container element
 */

const extractPost = elem => {
	const title = elem.find('.card__title a');
	const image = elem.find('a[data-src]');
	const views = elem.find("a[title='Views'] span");
	const comments = elem.find("a[title='Comments'] span.comment-number");

	return {
		title: fetchElemInnerText(title),
		image: extractUrlAttribute('data-src')(image),
		url: extractScotchUrlAttribute('href')(title),
		views: extractNumber(views),
		comments: extractNumber(comments)
	};
};

/**
 * Extract a single stat from container element
 */
const extractStat = elem => {
	const statElem = elem.find(".stat");
	const labelElem = elem.find('.label');

	const lowercase = val => _.isString(val) ? val.toLowerCase() : null;

	const stat = extractNumber(statElem);
	const label = compose(lowercase, fetchElemInnerText)(labelElem);

	return { [label]: stat };
};

/**
 * Extract profile from a Scotch author's page using the Cheerio parser instance
 * and returns the author profile object
 */

const extractAuthorProfile = $ => {
	const mainSite = $('#site__main');
	const metaScotch = $("meta[property='og:url']");
	const scotchHero = mainSite.find('section.hero--scotch');
	const superGrid = mainSite.find('section.super-grid');

	const authorTitle = scotchHero.find(".profile__name h1.title");
	const profileRole = authorTitle.find(".tag");
  const profileAvatar = scotchHero.find("img.profile__avater");
  const profileStats = scotchHero.find(".profile__stats .profile__stat");
	const authorLinks = scotchHero.find(".author-links a[target='_blank']");
  const authorPosts = superGrid.find(".super-grid__item [data-type='post']");

	const extractPosts = extractFromElems(extractPost)();
	const extractStats = extractFromElems(extractStat)(fromPairsToObject);
	const extractSocialUrls = extractFromElems(extractSocialUrl)(fromPairsToObject);

	return Promise.all([
		fetchElemInnerText(authorTitle.contents().first()),
		fetchElemInnerText(profileRole),
		extractUrlAttribute('content')(metaScotch),
		extractUrlAttribute('src')(profileAvatar),
		extractSocialUrls(authorLinks)($),
		extractStats(profileStats)($),
		extractPosts(authorPosts)($)
	]).then(([ author, role, url, avatar, social, stats, posts ]) =>
		({ author, role, url, avatar, social, stats, posts }));

};

/**
 * Fetches the Scotch profile of the given author
 */

const fetchAuthorProfile = author => {
	const AUTHOR_URL = `${HAYASHI_BASE}/@${author.toLowerCase()}`;
	return composeAsync(extractAuthorProfile, fetchHtmlFromUrl)(AUTHOR_URL);
};

module.exports = { fetchAuthorProfile };
