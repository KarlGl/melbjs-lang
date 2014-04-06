exports.all = [{
    code: '+\n  1\n  1'
}, {
    code: '+\n  *\n    2\n    2\n  1'
}, {
		name: 'variables',
		desc: 'Why should variables be letters?',
    code: '=\n  1\n  100'
}, {
		// name: 'variable lookup.',
		desc: 'lookup variable named 1',
    code: '=\n  1\n  100\n@\n  1'
}, {
		desc: 'actually... why should variables avoid spaces?',
    code: '=\n  an actual normal name\n  100\n@\n  an actual normal name'
}, {
		name: 'conditional logic',
		desc: 'is 100 less than 1 plus 1?',
    code: '?\n  <\n    100\n    +\n      1\n      1\n  1\n  0'
}, {
		name: 'first class functions',
		desc: 'define a function with ` and call a function with . this function adds 1 and 1, and is called imediately',
		code: '.\n  `\n    +\n      1\n      1'
}, {
		desc: 'functions with arguments. This function adds one to anything passed in.',
		code: '=\n  add one\n  `\n    +\n      1\n      &\n        before add\n    before add\n.\n  @\n    add one\n  10'
}, {
		name: 'factorial',
		desc: 'just to prove this is a real language, here\'s a recursive implementation of a factorial calculating function.',
		code: "=\n  factorial for\n  `\n    ?\n      <\n        &\n          current nth\n        2\n      1\n      *\n        &\n          current nth\n        .\n          @\n            factorial for\n          -\n            &\n              current nth\n            1\n    current nth\n.\n  @\n    factorial for\n  4\n"
}]
