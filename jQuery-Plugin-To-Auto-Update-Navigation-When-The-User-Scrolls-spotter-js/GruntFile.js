module.exports = function(grunt){

	// 1. Configure grunt modules
	grunt.initConfig({
		 pkg : grunt.file.readJSON('package.json'),

		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	       	// 1. BANNER
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		usebanner: {
			js: {
				options: { banner: "/* <%= bannerTemplate %> */" },
				files: { src: ["src/jquery.spotter.min.js"] }
			}
		},
		bannerTemplate:
			"\n * <%= bannerData.name %>, version <%= bannerData.version %>" +
			"\n * Copyright <%= bannerData.year %>, <%= bannerData.author %>" +
			"\n * Github: <%= bannerData.url %>" +
			"\n * License: http://www.opensource.org/licenses/mit-license.php \n",
		bannerData: {
			name: "jquery.spotter.js",
			url: "github.com/charltonc/jquery-spotter",
			version: "1.0a",
			year: "2014-2015",
			author: "Charlton Cheng"
		},


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// 2. JAVASCRIPT
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		uglify: {
			options: {
				compress: true,
				mangle: true,
				sourceMap: "jquery.spotter.map"
			 },
			taskMain: {
				src: ["src/jquery.spotter.js"],
				dest: "src/jquery.spotter.min.js"
			}
		},


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// 3. SASS/CSS/PREFIX
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		sass: {
			options: { style: "compressed" },		// expanded, nested, compact, compressed
			taskName: {
				src: "sass/style.scss",
				dest: "css/style.min.css"
			}
		},


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		// 4. MONITOR & RELOAD
		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		watch: {
			taskJs: {
				files: ["src/jquery.spotter.js"],
				tasks: ["uglify", "usebanner"]
			},
			taskSass: {
				files: ["sass/style.scss"],
				tasks: ["sass"]
			}
		},
		browserSync: {
			options: {
				server: { baseDir: "./" },			// serve files from where 'grunt mon' is called in cmd
									// add option index: "index-test.html" for testing another page
				browser: ["google chrome", "firefox", "internet explorer"],
				open: false,
				watchTask: true,
				logConnections: true,
				ghostMode: {
					scroll: true
				},
				scrollProportionally: true
			},
			taskWatch: {
				src: [						// folders or files to monitor
					"index.html",				// http://localhost:3000/
					"style.min.css",				// http://localhost:3000/
					"src/jquery.spotter.js"
				]
			}
		}
	});  // end grunt.initConfig()


	// 2. Load grunt modules
	grunt.loadNpmTasks("grunt-banner");
	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-watch");
	grunt.loadNpmTasks("grunt-browser-sync");

	// 3. Configure cmd shortcut
	grunt.registerTask("mon", ["browserSync", "watch"]);			// Cmd: grunt mon

};	// end Module.exports
