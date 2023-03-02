"use strict";(self.webpackChunkdatatlas=self.webpackChunkdatatlas||[]).push([[671],{3586:function(t,e,a){a.r(e),a.d(e,{assets:function(){return p},contentTitle:function(){return i},default:function(){return m},frontMatter:function(){return s},metadata:function(){return u},toc:function(){return d}});var n=a(7462),l=a(3366),r=(a(7294),a(3905)),o=["components"],s={sidebar_position:1},i="\ud83c\udf0d Datatlas",u={unversionedId:"intro",id:"intro",title:"\ud83c\udf0d Datatlas",description:"What is DatAtlas ?",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/https://datatlas-erasme.github.io/datatlas/docs/intro",draft:!1,editUrl:"https://github.com/datatlas-erasme/datatlas/docs/intro.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar"},p={},d=[{value:"What is DatAtlas ?",id:"what-is-datatlas-",level:2},{value:"\ud83d\udc24 Getting started",id:"-getting-started",level:2},{value:"\u2328\ufe0f Development",id:"\ufe0f-development",level:3},{value:"Prerequisites",id:"prerequisites",level:4},{value:"\u2699\ufe0f Installation",id:"\ufe0f-installation",level:4},{value:"\ud83d\udd25 Run",id:"-run",level:4},{value:"\ud83d\udd0e Test and lint",id:"-test-and-lint",level:4},{value:"\ud83d\ude80 Deploy",id:"-deploy",level:3},{value:"Contributing",id:"contributing",level:2}],c={toc:d},k="wrapper";function m(t){var e=t.components,a=(0,l.Z)(t,o);return(0,r.kt)(k,(0,n.Z)({},c,a,{components:e,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"-datatlas"},"\ud83c\udf0d Datatlas"),(0,r.kt)("h2",{id:"what-is-datatlas-"},"What is DatAtlas ?"),(0,r.kt)("p",null,"DatAtlas is a project thats aims at creating the Wordpress for maps ! Thanks to this beautiful tool you will be able to create custom web maps by selecting your data, choosing your features, adding your style. Once your map is created you can embed it in any website you want. You want to create beautiful maps with 3D data ? With lot of layers ? With specific features ? You are at the right place !"),(0,r.kt)("h2",{id:"-getting-started"},"\ud83d\udc24 Getting started"),(0,r.kt)("p",null,"Datatlas is still under heavy development.\nYou can deploy it locally for development purpose.\nThe production version will be available soon."),(0,r.kt)("h3",{id:"\ufe0f-development"},"\u2328\ufe0f Development"),(0,r.kt)("h4",{id:"prerequisites"},"Prerequisites"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://nodejs.org/en/download/"},"Node.js")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://www.npmjs.com/get-npm"},"npm")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://docs.docker.com/get-docker/"},"Docker"))),(0,r.kt)("h4",{id:"\ufe0f-installation"},"\u2699\ufe0f Installation"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"git clone https://github.com/datatlas-erasme/datatlas\ncd datatlas\ngit checkout dev\nnpm install\n")),(0,r.kt)("h4",{id:"-run"},"\ud83d\udd25 Run"),(0,r.kt)("p",null,"Run the postgres database and pgadmin with docker"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker-compose up -f dev.docker-compose.yml\n\n")),(0,r.kt)("p",null,"In another shell, run the backend"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx nx serve backend\n")),(0,r.kt)("p",null,"In another shell, run the frontend"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx nx serve frontend\n")),(0,r.kt)("p",null,"You can optionnaly run the documentation"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx nx serve doc\n")),(0,r.kt)("p",null,"You can now access :"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"the frontend at http://localhost:3000"),(0,r.kt)("li",{parentName:"ul"},"the backend at http://localhost:3333"),(0,r.kt)("li",{parentName:"ul"},"pgadmin at http://localhost:5431"),(0,r.kt)("li",{parentName:"ul"},"the documentation at http://localhost:3001")),(0,r.kt)("h4",{id:"-test-and-lint"},"\ud83d\udd0e Test and lint"),(0,r.kt)("p",null,"Jest, Cypress and husky are used for testing and \ud83c\udf38 linting."),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"}," \ud83d\udc3a Husky")),(0,r.kt)("p",null,"Please install husky on your local machine to run the pre-commit hook"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npm install -g husky\n")),(0,r.kt)("p",null,"Use 'nx format:write' before commiting to format the code with prettier"),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Frontend")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx nx run frontend:test\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"Backend")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx nx run backend:test\n")),(0,r.kt)("p",null,"We also use cypress for e2e testing on the backend"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"npx cypress run\n")),(0,r.kt)("h3",{id:"-deploy"},"\ud83d\ude80 Deploy"),(0,r.kt)("p",null,"Built images are available on ",(0,r.kt)("a",{parentName:"p",href:"https://hub.docker.com/u/erasme"},"Docker Hub")),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://hub.docker.com/r/erasme/datatlas-frontend"},"\ud83d\uddfa\ufe0f Frontend")),(0,r.kt)("li",{parentName:"ul"},(0,r.kt)("a",{parentName:"li",href:"https://hub.docker.com/r/erasme/datatlas-backend"},"\ud83d\udccb Backend"))),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"},"\ud83d\udc0b Docker run")),(0,r.kt)("p",null,"You can run the images with the following commands"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker run -d --name datatlas-db \\\n-e POSTGRES_USER=docker -e POSTGRES_PASS=docker -p 5432:5432 \\\nkartoza/postgis:15-3.3 \\\n&& docker run -d --name datatlas-backend -p 3333:3333 erasme/datatlas-backend \\\n&& docker run -d --name datatlas-frontend -p 3000:80 erasme/datatlas-frontend\n\n")),(0,r.kt)("p",null,(0,r.kt)("strong",{parentName:"p"}," \ud83d\udc33 Docker build")),(0,r.kt)("p",null,"You can build the images locally with the following commands"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-bash"},"docker-compose build -f prod.docker-compose.yml\n")),(0,r.kt)("h2",{id:"contributing"},"Contributing"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"I'm a developer, how can I contribute ?"),(0,r.kt)("li",{parentName:"ul"},"I'm a designer, how can I contribute ?"),(0,r.kt)("li",{parentName:"ul"},"I'm a user, how can I contribute ?"),(0,r.kt)("li",{parentName:"ul"},"I'm a researcher, how can I contribute ?")))}m.isMDXComponent=!0}}]);