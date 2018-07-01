FROM node
ADD . /webmain/
WORKDIR /webmain
ADD package.json /webmain/
ADD package-lock.json /webmain/
RUN npm install
RUN npm run build
CMD node app.js
