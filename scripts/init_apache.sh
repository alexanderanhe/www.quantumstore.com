#!/bin/sh

#Check if this is www or dns
DIRINIT="/isInit"
if [ -d "$DIRINIT" ]; then
echo "Server already initiated"

else


#Server name
echo "ServerName DelDesfile" >> /etc/apache2/apache2.conf

#check if default and remove all
cd /etc/apache2/sites-available

#Remoive default sites
defaultserverfile="/etc/apache2/sites-available/000-default.conf"
if [ -f "$defaultserverfile" ]
then
  echo "$defaultserverfile found. Removing default site"
  sudo  a2dissite 000-default.conf
  rm 000-default.conf
  rm default-ssl.conf
else
  echo "$defaultserverfile not found."
fi


##Add conf files

  cat <<EOF >www.deldesfile.com.conf
  #kontrol
  <VirtualHost *:80>
  ServerName www.deldesfile.com
  DocumentRoot /srv/www.deldesfile.com/web/content/
  <Directory /srv/www.deldesfile.com/web/content/>
      Require all granted
      Options FollowSymLinks MultiViews
      AllowOverride All
  </Directory>
  ErrorLog /www_deldesfile_com_error.log
  LogLevel warn
  CustomLog /www_deldesfile_com.log combined
  </VirtualHost>
EOF

a2ensite www.deldesfile.com.conf

a2enmod rewrite

php5enmod mcrypt

mkdir /isInit

fi
