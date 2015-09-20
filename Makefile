default: run

install:
	bundle install

## BUILD STEPS
build: css

css:
	node_modules/.bin/lessc _less/main.less css/main.css

## RUN STEPS
run: build
	bundle exec jekyll serve --baseurl ''

.PHONY: build css
