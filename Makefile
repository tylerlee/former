BIN=node_modules/.bin/
COGS=$(BIN)cogs

cogs:
	$(COGS) -w examples/index.es6,scripts,styles
