import test from 'ava';
import fn from './';

test('.lintText()', t => {
	const results = fn.lintText('\'use strict\';\nconsole.log("unicorn");\n').results;
	t.is(results[0].messages[0].ruleId, 'quotes');
	t.end();
});

test('.lintText() - `esnext` option', t => {
	const results = fn.lintText('function dec() {}\nconst x = {\n\t@dec()\n\ta: 1\n};\n', {esnext: true}).results;
	t.is(results[0].messages[0].ruleId, 'no-unused-vars');
	t.end();
});

test('.lintText() - JSX support', t => {
	const results = fn.lintText('var app = <div className="appClass">Hello, React!</div>;\n', {esnext: false}).results;
	t.is(results[0].messages[0].ruleId, 'no-unused-vars');
	t.end();
});

test('.lintText() - plugin support', t => {
	const results = fn.lintText('var React;\nReact.render(<App/>);\n', {
		plugins: ['react'],
		rules: {'react/jsx-no-undef': 2}
	}).results;
	t.is(results[0].messages[0].ruleId, 'react/jsx-no-undef');
	t.is(results[0].messages[0].message, '\'App\' is not defined.');
	t.end();
});

// TODO: more tests
