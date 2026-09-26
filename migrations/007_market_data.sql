CREATE TABLE quotes (time TIMESTAMPTZ NOT NULL, symbol TEXT NOT NULL, bid NUMERIC, ask NUMERIC);
SELECT create_hypertable('quotes','time', if_not_exists => TRUE);
CREATE TABLE candles (time TIMESTAMPTZ NOT NULL, symbol TEXT NOT NULL, tf TEXT NOT NULL, o NUMERIC, h NUMERIC, l NUMERIC, c NUMERIC, v NUMERIC);
SELECT create_hypertable('candles','time', if_not_exists => TRUE);
