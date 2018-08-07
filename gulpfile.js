var gulp        = require('gulp');
var gutil       = require('gulp-util');
var shell       = require('gulp-shell');
var yaml        = require('json2yaml');
var fs          = require('fs');
var runSequence = require('run-sequence')

var paths = {
	source:'site/',
	deploy: 'site/dist'
};

// build jekyll
gulp.task('jekyll', function() {
	return gulp.src('', {quiet: false})
	.pipe(shell([
		'rm -rf ' + paths.deploy,
		'jekyll build -s '+paths.source + ' -d '+paths.deploy
	]));
});

// Get YT videos
gulp.task("get:videos", function() {

	console.log("Getting YT videos");
	//rss url for your videos
	const url = 'https://www.youtube.com/feeds/videos.xml?channel_id=UC8KROrnEHSnnV3z5J_FoSIg';

	let Parser = require('rss-parser');
	let parser = new Parser();

	let videos = [];

	(async () => {
		let feed = await parser.parseURL(url);
	
		feed.items.forEach(item => {
			//create a videoId from id
			item.videoId = item.id.split(":").pop();
			videos.push(item);
		});

        let ymlText = yaml.stringify(videos);

		fs.writeFile('./site/_data/videos.yml', ymlText, function(err) {
			if(err) {
				console.log(err);
			} else {
				console.log("Video data saved.");
			}
		});

	})();

});

gulp.task('build', function(callback) {
  runSequence(
    'get:videos',
    'jekyll',
    callback
  );
});

// The default task.
gulp.task('default', ['build']);
