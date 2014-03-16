exports.functions = {
    double: function(args) {
        return "(" + args + " * 2)"
    },
    addition: function(args) {
        args = eval(args)
        return args.left + " + " + args.right + ""
    },
    'square it': function(args) {
        args = eval(args)
        return "(" + args + " * " + args +  ")" 
    }
}

exports.docs = [{
        name: 'double',
        desc: 'Will double a number.',
        args: [{
            desc: 'The number you wish to double.'
        }]
    }, {
        name: 'addition',
        desc: 'Will add two numbers.',
        args: [{
            name: 'left',
            desc: 'The left hand side of the addition.'
        }, {
            name: 'right',
            desc: 'The right hand side of the addition.'
        }]
    }]
