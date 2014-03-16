require "socket"
 
webserver = TCPServer.new('localhost', 2000)
base_dir = Dir.new(".")
while (session = webserver.accept)
  session.print "HTTP/1.1 200/OK\r\nContent-type:text/html\r\n\r\n"
  base_dir.entries.each do |f|
    if File.directory? f
      session.print("
#{f}/
 
")
    else
      session.print("
#{f}
 
")
    end
  end
  session.close
end
