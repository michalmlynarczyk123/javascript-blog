'use strict';

function clearMessages(titleList){
// document.querySelector(optTitleListSelector);
// document.querySelector(document.querySelector(optTitleListSelector)).innerHTML=''
  titleList.innerHTML='';
}

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

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

/*----------------------------------------------------------*/
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

  
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
generateTitleLinks();

/*--------------------------------------------*/

function generateTags(){
  
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

	const linkHTML = '<li><a href="#tag-' + '">' + tag + '</a></li>';

      /* add generated code to html variable */

        html += linkHTML + ' ';

    /* END LOOP: for each tag */
	  }
    /* insert HTML of all the links into the tags wrapper */

      console.log('insert HTML');
      tagsWrapper.innerHTML = html;

  /* END LOOP: for every article: */
}
}
generateTags(); 

/* ----------------------------------------------------------*/
function tagClickHandler(event){
  /* prevent default action for this event */
  
      event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  
      const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

    const href = clickedElement.getAttribute('href');
    console.log(href);
	
  /* make a new constant "tag" and extract tag from the "href" constant */

    const tag = href.replace('#tag-', '');
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
  
      const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

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
  /* find all links to tags */
  
      const tagLinks = document.querySelectorAll('a[href^="#tag-"]');

  /* START LOOP: for each link */
  
      for(let tagLink of tagLinks){

    /* add tagClickHandler as event listener for that link */
	
	      tagLink.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
}
}
addClickListenersToTags();

/* ------------------------------------------------------- */ 