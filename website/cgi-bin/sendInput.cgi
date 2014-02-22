#!/usr/bin/env python
import cgi
import json
import os
# import cgitb


print 'Content-Type: application/json'
print


# # get post data
form = cgi.FieldStorage()
content = form['content'].value
# timestamp = form['timeStamp'].value

try: 
    f = open('data/chatlog.txt', 'w+')
    f.write(cgi.escape(os.environ["REMOTE_ADDR"]))
    f.close()
    # print '<h1 style="color: blue">Package for %s</h1>' % form['textInput'].value()
    print json.dumps({"status": "success"})
except:
    print json.dumps({"status": "fail"})
