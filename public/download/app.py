from socketIO_client import SocketIO, BaseNamespace

class Namespace(BaseNamespace):
    def on_connect(self, *args):
        print "connected"
        
    def on_update(self, *args):
        data = args[0]
        print data["index"], data["controller"], data["value"]

socketIO = SocketIO('xbox.jimib.co.uk', 80, Namespace)

while True:
    try:
        socketIO.wait(seconds=1)
    except KeyboardInterrupt:
        break
    except:
        print "Error occured - ignoring"
