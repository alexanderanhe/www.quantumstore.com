#!/bin/sh

sudo curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin creates=/usr/local/bin/composer
sudo mv /usr/local/bin/composer.phar /usr/local/bin/composer creates=/usr/local/bin/composer
path=/usr/local/bin/composer mode=a+x state=file

cd /srv/www.deldesfile.com/web/
sudo composer.phar install --no-dev

cd /srv/www.deldesfile.com/web/application/config

apache2ctl graceful
ID="`wget -q -O - http://169.254.169.254/latest/meta-data/local-ipv4 || die \"wget instance-id has failed: $?\"`"
DATE="`date +%Y-%m-%d_%H:%M:%S`"
echo $ID $DATE >> /srv/www.deldesfile.com/web/content/last_updated.txt
