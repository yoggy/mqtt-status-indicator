mqtt-status-indicator.js
====

mqtt-status-indicator displays the statistics of local MQTT broker using redis-ssd-1306.py.

Setup
----

    $ mkdir ~/work/
    $ cd ~/work/
    $ git clone https://github.com/yoggy/mqtt-status-indicator.git
    $ cd mqtt-status-indicator
    $ npm install
    $ node mqtt-status-indicator.js

    # for supervisor
    $ sudo cp mqtt-status-indicator.conf.sample /etc/supervisor/conf.d/mqtt-status-indicator.conf
    $ sudo vi /etc/supervisor/conf.d/mqtt-status-indicator.conf
      (fix path, etc...)
    $ sudo supervisorctl reread
    $ sudo supervisorctl add mqtt-exec
    $ sudo supervisorctl status    

Copyright and license
----
Copyright (c) 2018 yoggy

Released under the [MIT license](LICENSE.txt)

