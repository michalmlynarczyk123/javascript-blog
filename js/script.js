
'use strict';

/* SELEKTORY DO ELEMENTÓW W HTML */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author',
  optTagListSelector = '.tag.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = 'authors.list';

/* FUNKCJE */
const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!');
  console.log(event);


  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }

  const activeArticles = document.querySelectorAll('.posts article.active');

  clickedElement.classList.add('active');{
    console.log('clickedElement:', clickedElement);
  }

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    console.log('clickedElement:', clickedElement);
  }

  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');{
    console.log(articleSelector);
  }

  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log(targetArticle);

  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
};  
  
function generateTitleLinks(customSelector = ''){

  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  /* remove contents of titleList */
    

  /* find all the articles and save them to variable: articles */
    
  let html = '';
  console.log(html);
    
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  for(let article of articles){
    console.log(article);
    console.log(customSelector);
    
    /* get the article id */

    const articleId = article.getAttribute('id');
    
    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';{
      console.log(linkHTML);
    }

    /* insert link into html variable */
    html = html + linkHTML;

    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');{
      console.log(links);
    }
    
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
    
  }
}

function calculateTagsParams(tags){
	const params = {
		min: 999999,
		max: 0
	};
	console.log(params);
    for(let tag in tags){
      console.log(tag + ' is used ' + tags[tag] + ' times');
      if(tags[tag] > params.max){
        params.max = tags[tag];
      }
      if(tags[tag] < params.min){
        params.min = tags[tag];
      }
    }
    console.log(tags);
    return params;
  }

function calculateTagClass(count, params){
	const normalizedCount = count - params.min;
	const normalizedMax = params.max - params.min;
	const percentage = normalizedCount / normalizedMax;
	const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
	return optCloudClassPrefix + classNumber;
  }

function generateTags(){
  
    /* [NEW] create a new variable allTags with an empty object */
	let allTags = {};
	
  /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(articles);
	
  /* START LOOP: for every article: */
    for(let article of articles){
      console.log(article);

    /* find tags wrapper */
      const tagsWrapper = article.querySelector(optArticleTagsSelector);{
        console.log(tagsWrapper);
      }

    /* make html variable with empty string */
		 let html = '';

    /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');{
        console.log(articleTags);
      }

    /* split tags into array */
		const articleTagsArray = articleTags.split(' ');{
        console.log(articleTagsArray);
      }

    /* START LOOP: for each tag */
	for(let tag of articleTagsArray){
        console.log(tag);

      /* generate HTML of the link */
	const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */
	html += linkHTML + ' ';
	     
	/* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        
	/* [NEW] add generated code to allTags array */
     allTags[tag] = 1;
     }else {
	 allTags[tag]++;
	 }

    /* END LOOP: for each tag */
	  }
    /* insert HTML of all the links into the tags wrapper */
	console.log('insert HTML');
     tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
}
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);
	
  /* [NEW] add html from allTags to tagList */
  //tagList.innerHTML = allTags.join(' ');//
  //console.log(allTags);//
  /* [NEW] create varible for all links HTML code */
  let allTagsHTML = '';
  
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){
	  
		/* [NEW] generate code of a link and add it to allTagsHTML */
		//allTagsHTML += tag + '('+allTags[tag] +')';//
		//allTagsHTML += '<li><a href="#tag-'+ tag +'">'+ tag +'</a>(' + allTags[tag] + ')</li>';//
	const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a>(' + allTags[tag] + ')</li>';
    console.log('tagLinkHTML:', tagLinkHTML);
	
	allTagsHTML += tagLinkHTML;
	
   /* [NEW] END LOOP: for each tag in allTags */
  }
   /* [NEW] add htm from allTagsHTML to tagList  */
   tagList.innerHTML = allTagsHTML;
}

function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href'); //#tag-cat #tag-sport
  console.log(href);
	
  /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', ''); //#tag-sport -> sport
    console.log(tag);

  /* find all tag links with class active */
  
    const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
    console.log(activeTags);

  /* START LOOP: for each active tag link */

    let html = '';
    console.log(html);

    for(let activeTag of activeTags){
      console.log(activeTag);

    /* remove class active */

      activeTag.classList.remove('active');
	  
  /* END LOOP: for each active tag link */
	}
  /* find all tag links with "href" attribute equal to the "href" constant */
  
      const tagLinks = document.querySelectorAll('a.active[href="' + href + '"]');

  /* START LOOP: for each found tag link */

    for(let tagLink of tagLinks){
      console.log(tagLink);

    /* add class active */

      tagLink.classList.add('active');

  /* END LOOP: for each found tag link */
	}
  /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

function addClickListenersToTags(){
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

    for(let tagLink of tagLinks){
	    tagLink.addEventListener('click', tagClickHandler);
    }
}

function generateAuthors(){
   /* [NEW] create a new variable allTags with an empty object */
	let allAuthors= {};
	
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
	
  /* START LOOP: for every article: */
  for(let article of articles){
    
    /* find tags wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);

    /* get tags from data-tags attribute */
    const author = article.getAttribute('data-author');

    /* generate HTML of the link */
	  const linkHTML = 'by <a href="#author-' + author + '">' + author+ '</a>';
	  
	 /* [NEW] check if this link is NOT already in allTags */
      if(!allAuthors.hasOwnProperty(author)){
        
	/* [NEW] add generated code to allTags array */
     allAuthors[author] = 1;
     }else {
	 allAuthors[author]++;
	 }

    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = linkHTML;

  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const AuthorList = document.querySelector('.Authors');
	
  /* [NEW] add html from allTags to tagList */
  //AuthorList.innerHTML = allAuthors.join(' ');//
 //console.log(allAuthors);//
  /* [NEW] create varible for all links HTML code */
  let allAuthorsHTML = '';
  
  /* [NEW] START LOOP: for each tag in allTags: */
  for(let Author in allAuthors){
	  
		/* [NEW] generate code of a link and add it to allTagsHTML */
		//allAuthorsHTML += Author + '('+allAuthors[tag] +')';//
		//allAuthorsHTML += '<li><a href="#Author-'+ Author +'">'+ Author +'</a>(' + allAuthors[Author] + ')</li>';//
	const AuthorLinkHTML = '<li><a class="' + '" href="#Author-' + Author + '">' + Author + '</a>(' + allAuthors[Author] + ')</li>';
   console.log('AuthorLinkHTML:', AuthorLinkHTML);
	
	allAuthorsHTML += AuthorLinkHTML;
	
   /* [NEW] END LOOP: for each tag in allTags */
  }
   /* [NEW] add htm from allTagsHTML to tagList  */
   AuthorList.innerHTML = allAuthorsHTML;
}

function addClickListenersToAuthors(){
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');

  for(let authorLink of authorLinks){
    authorLink.addEventListener('click', authorClickHandler);
  }
}

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href'); //#author-Marion Barry
	
  /* make a new constant "tag" and extract tag from the "href" constant */

    const author = href.replace('#author-', ''); //#author-Marion Barry -> Marion Barry
  
  /* find all tag links with class active */
    const activeAuthors = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active tag link */

    let html = '';
    console.log(html);

    for(let activeAuthor of activeAuthors ){
      activeAuthor.classList.remove('active');
	  }
  
    /* find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a.active[href="' + href + '"]');

    for(let authorLink of authorLinks) {
      authorLink.classList.add('active');
	  }
  
    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author+ '"]');
  }



/* GŁÓWNY PROCES */ 
generateTitleLinks();
generateTags(); 
addClickListenersToTags();
generateAuthors();
addClickListenersToAuthors();
calculateTagsParams();
calculateTagClass();