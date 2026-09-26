healer:
  build: ./healer
  restart: unless-stopped
  environment:
    - TZ=Africa/Kampala
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
  command: ["cron", "-f"]
