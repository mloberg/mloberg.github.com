const BINPATH = './node_modules/nightwatch/bin/';

module.exports = {
    "src_folders": ["tests/tests"],
    "output_folder": "tests/reports",
    "custom_assertions_path": "tests/assertions",
    "selenium" : {
        "start_process": true,
        "server_path": BINPATH + "selenium.jar", // downloaded by selenium-download module (see below)
        "log_path": "",
        "host": "127.0.0.1",
        "port": 4444,
        "cli_args": {
            "webdriver.chrome.driver": BINPATH + "chromedriver" // also downloaded by selenium-download
        }
    },
    "test_workers": {"enabled" : true, "workers" : "auto"}, // perform tests in parallel where possible
    "test_settings": {
        "default": {
            "launch_url": "http://localhost:4000",
            "selenium_port": 4444,
            "selenium_host": "127.0.0.1",
            "silent": true,
            "screenshots": {
                "enabled": true,
                "path": "tests/screenshots"
            },
            "desiredCapabilities": {
                "browserName": "chrome",
                "chromeOptions": {
                    "args": ["--headless", "--disable-gpu"]
                },
                "javascriptEnabled": true,
                "acceptSslCerts": true
            }
        }
    }
};

/**
 * selenium-download does exactly what it's name suggests;
 * downloads (or updates) the version of Selenium (& chromedriver)
 * on your localhost where it will be used by Nightwatch.
 */
require('fs').stat(BINPATH + 'selenium.jar', function (err, stat) { // got it?
  if (err || !stat || stat.size < 1) {
    require('selenium-download').ensure(BINPATH, function(error) {
      if (error) throw new Error(error); // no point continuing so exit!
      console.log('✔ Selenium & Chromedriver downloaded to:', BINPATH);
    });
  }
});
