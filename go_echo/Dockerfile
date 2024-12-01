FROM golang:1.22.4-alpine

ENV APP_PATH /go_echo
WORKDIR $APP_PATH

COPY go.mod go.sum $APP_PATH/
RUN go mod download

COPY . .

RUN go build -o /go-echo

EXPOSE 8080
CMD ["/go-echo"]