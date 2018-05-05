 FROM node
 RUN mkdir /webmain
 WORKDIR /webmain
 ADD package.json /webmain/
 ADD package-lock.json /webmain/
 RUN npm install
