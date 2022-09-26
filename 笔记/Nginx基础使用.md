## Nginx的安装

#### **版本区别**

常用版本分为四大阵营

* Nginx开源版
  http://nginx.org/

* Nginx plus 商业版
  https://www.nginx.com

* openresty
  http://openresty.org/cn/

* Tengine
  http://tengine.taobao.org/
  **编译安装**
  ```./configure --prefix=/usr/local/nginx```
  ```make```
  ```make install```

  #### 如果出现警告或报错

  提示

```
checking for OS 
Linux 3.10.0-693.el7.x86_64 x86_64 
checking for C compiler ... not found 
./configure: error: C compiler cc is not found 
```

​	安装gcc
​	```yum install -y gcc```
​	提示：

```
./configure: error: the HTTP rewrite module requires the PCRE library. 
You can either disable the module by using --without-http_rewrite_module 
option, or install the PCRE library into the system, or build the PCRE library 
statically from the source with nginx by using --with-pcre=<path> option. 

```

安装perl库
```yum install -y pcre pcre-devel```
提示：

```
./configure: error: the HTTP gzip module requires the zlib library. 
You can either disable the module by using --without-http_gzip_module 
option, or install the zlib library into the system, or build the zlib library 
statically from the source with nginx by using --with-zlib=<path> option.
```

安装zlib库
```yum install -y zlib zlib-devel```
接下来执行
```make ```
```make install ```

#### 启动Nginx

进入安装好的目录**/usr/local/nginx/sbin**

```
./nginx 启动  
./nginx -s stop 快速停止
./nginx -s quit 优雅关闭，在退出前完成已经接受的连接请求
./nginx -s reload 重新加载配置
```

#### 关于防火墙(不要乱动)

**关闭防火墙**
```systemctl stop firewalld.service```
**禁止防火墙开机启动**
```systemctl disable firewalld.service```

放行端口
```firewall-cmd --zone=public --add-port=80/tcp --permanent```
重启防火墙
```firewall-cmd --reload```

#### 安装成系统服务

**创建服务脚本**
```vi /usr/lib/systemd/system/nginx.service```
**服务脚本内容**

```
[Unit] 
Description=nginx -  web server 
After=network.target remote-fs.target nss-lookup.target 

[Service] 
Type=forking 
PIDFile=/usr/local/nginx/logs/nginx.pid 
ExecStartPre=/usr/local/nginx/sbin/nginx -t -c /usr/local/nginx/conf/nginx.conf 
ExecStart=/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf 
ExecReload=/usr/local/nginx/sbin/nginx -s reload 
ExecStop=/usr/local/nginx/sbin/nginx -s stop 
ExecQuit=/usr/local/nginx/sbin/nginx -s quit 
PrivateTmp=true 

[Install] 
WantedBy=multi-user.target 
```

**重新加载系统服务**
```systemctl daemon-reload```
**启动服务**
```systemctl start nginx.service```
**开机启动**
```systemctl enable nginx.service```

## **Nginx** **基础使用**

#### **目录结构**

进入Nginx的主目录我们可以看到这些文件夹

```
client_body_temp conf fastcgi_temp html logs proxy_temp sbin scgi_temp uwsgi_temp
```

其中这几个文件夹在刚安装后是没有的，主要用来存放运行过程中的临时文件

```
client_body_temp fastcgi_temp proxy_temp scgi_temp
```

**conf**

用来存放配置文件相关

**html**

用来存放静态文件的默认目录 html、css等

**sbin**

nginx的主程序

#### **基本运行原理**

![1663312544617.png](https://s2.232232.xyz/static/67/2022/09/16-632422a928b85.png)

#### **Nginx配置与应用场景**

**最小配置**

**worker_processes**

worker_processes 1; 默认为1，表示开启一个业务进程

**worker_connections**

worker_connections 1024; 单个业务进程可接受连接数

**include mime.types;**

include mime.types; 引入http mime类型

**default_type application/octet-stream;**

default_type application/octet-stream; 如果mime类型没匹配上，默认使用二进制流的方式传输。

**sendfifile on;**

sendfile on; 使用linux的 sendfile(socket, file, len) 高效网络传输，也就是数据0拷贝。

未开启sendfifile

![1663312635411.png](https://s2.232232.xyz/static/67/2022/09/16-632423024821c.png)

![1663312667574.png](https://s2.232232.xyz/static/67/2022/09/16-63242322e9fb7.png)

**server**

![1663312714569.png](https://s2.232232.xyz/static/67/2022/09/16-632423520eb41.png)

虚拟主机配置

```
server {
		listen 80; 监听端口号
		server_name localhost; 主机名 
		location / { 匹配路径
			root html; 文件根目录 
			index index.html index.htm; 默认页名称 
		}
		
		error_page 500 502 503 504 /50x.html; 报错编码对应页面 
		location = /50x.html { 
							root html; 
		} 
	}
```

#### **虚拟主机**

原本一台服务器只能对应一个站点，通过虚拟主机技术可以虚拟化成多个站点同时对外提供服务

**servername****匹配规则**

我们需要注意的是servername匹配分先后顺序，写在前面的匹配上就不会继续往下匹配了。

**完整匹配**

我们可以在同一servername中匹配多个域名

```
server_name vod.mmban.com www1.mmban.com;
```

**通配符匹配**

```
server_name *.mmban.com
```

**通配符结束匹配**

```
server_name vod.*;
```

**正则匹配**

```
server_name ~^[0-9]+\.mmban\.com$;
```

#### **反向代理**

```
proxy_pass http://baidu.com;
```

```
location / { 

	proxy_pass http://atguigu.com/; 

}
```

**基于反向代理的负载均衡**

```
upstream httpd { 

			server 192.168.44.102:80; 

			server 192.168.43.103:80; 

}
```

#### **负载均衡策略**

**轮询**

默认情况下使用轮询方式，逐一转发，这种方式适用于无状态请求。

**weight(权重)**

指定轮询几率，weight和访问比率成正比，用于后端服务器性能不均的情况。

```
upstream httpd { 

	server 127.0.0.1:8050 weight=10 down; 

	server 127.0.0.1:8060 weight=1; 

	server 127.0.0.1:8060 weight=1 backup; 

}
```

down：表示当前的server暂时不参与负载

weight：默认为1.weight越大，负载的权重就越大。

backup： 其它所有的非backup机器down或者忙的时候，请求backup机器。

**ip_hash**

根据客户端的ip地址转发同一台服务器，可以保持回话。

**least_conn**

最少连接访问

**url_hash**

根据用户访问的url定向转发请求

**fair**

根据后端服务器响应时间转发请求

#### **Https证书配置**
