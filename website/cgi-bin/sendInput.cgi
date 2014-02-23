#!/usr/bin/env python
import cgi
import json
import os

from datetime import datetime

from ip_dict import IP_DICT


print 'Content-Type: application/json'
print


# # get post data
form = cgi.FieldStorage()
content = form['content'].value
# timestamp = form['timeStamp'].value

try:
    time = datetime.now()

    log_time = time.strftime('%Y-%m-%d %H:%M')
    display_time = time.strftime('%H:%M')

    ip = cgi.escape(os.environ["REMOTE_ADDR"])
    
    try:
        user = IP_DICT[ip]
    except KeyError:
        user = 'unknown'

    f = open('data/chatlog_archive.txt', 'a')
    f.write('%s - %s: %s \n' % (log_time, user, content))
    f.close()

    f = open('data/chatlog.json', 'w+')
    f.write(json.dumps({
        'time': display_time,
        'user': user,
        'content': content
    }))
    f.close()

    # print '<h1 style="color: blue">Package for %s</h1>' % form['textInput'].value()
    print json.dumps({"status": "success"})
except:
    print json.dumps({"status": "fail"})
