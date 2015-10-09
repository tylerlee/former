BIN=node_modules/.bin/
COGS=$(BIN)cogs

cogs:
	$(COGS) -w src,styles,examples/src,examples/styles
