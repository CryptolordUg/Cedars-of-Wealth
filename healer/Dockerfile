FROM alpine:latest
ENV TZ=America/New_York
RUN apk add --no-cache docker-cli postgresql-client redis tzdata
COPY heal.sh /heal.sh
COPY crontab /etc/crontabs/root
RUN chmod +x /heal.sh
CMD ["crond", "-f"]
