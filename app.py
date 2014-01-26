from socketIO_client import SocketIO, BaseNamespace
from pyfirmata import Arduino, util
import time

board = Arduino('/dev/ttyACM0')

class Namespace(BaseNamespace):
    def on_connect(self, *args):
        print "connected"
        
    def on_update(self, *args):
        data = args[0]
        if data["controller"] == "BUTTON_4":
            board.digital[3].write(data["value"])

socketIO = SocketIO('localhost:4000', 4000, Namespace)

while True:
    socketIO.wait(seconds=1)
