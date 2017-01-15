import urllib3
import io
import base64
import simplejson
from dedent import dedent
from hack.settings import FB_APP_ID


class FacebookToken(object):

    urls = dedent({
        'token' :"""
           https://graph.facebook.com/me/?
           fields=email,name&
           access_token=%s""",
        'valid_app': """
            https://graph.facebook.com/app/?
            access_token=%s""",
        'get_img': """
            https://graph.facebook.com/me/picture?
            access_token=%(token)s&type=%(type)s
            &width=%(width)s&height=%(height)s"""
    })

    def __init__(self, token):
        self.token = token

    def is_valid(self):
        http = urllib3.PoolManager()
        r = http.request('GET', self.urls['valid_app'] % self.token)
        if r.status != 200:
            return False
        data = simplejson.loads(r.data)
        if int(data['id']) != int(FB_APP_ID):
            return False
        r = http.request('GET', self.urls['token'] % self.token)
        self.data = r.data
        return True if r.status == 200 else False

    def get_fb_user_data(self):
        return simplejson.loads(self.data)

    def get_fb_user_image(self, _type='square', width=130, height=130):
        http = urllib3.PoolManager()
        params = {
            'token': self.token,
            'type': _type,
            'width': width,
            'height': height
        }
        r = http.request('GET', self.urls['get_img'] % params)
        if r.status != 200:
            return False
        img = io.BytesIO(r.data)
        pic = img.read()
        return base64.b64encode(pic)
