#!/bin/bash

# Start MySQL with proper permissions
echo "🚀 Starting MySQL with proper configuration..."

# Kill any existing MySQL processes
pkill -f mysqld 2>/dev/null

# Wait a moment
sleep 2

# Create a temporary directory for MySQL
mkdir -p /tmp/mysql_temp
chmod 755 /tmp/mysql_temp

# Start MySQL with specific configuration
/usr/local/opt/mysql/bin/mysqld \
  --datadir=/usr/local/var/mysql \
  --socket=/tmp/mysql.sock \
  --port=3306 \
  --user=raoasifraza \
  --skip-grant-tables \
  --skip-networking \
  --pid-file=/tmp/mysql.pid \
  --log-error=/tmp/mysql_error.log \
  --innodb-use-native-aio=0 &

# Wait for MySQL to start
echo "⏳ Waiting for MySQL to start..."
sleep 5

# Check if MySQL is running
if pgrep -f mysqld > /dev/null; then
    echo "✅ MySQL is running!"
    echo "📊 Process ID: $(pgrep -f mysqld)"
    echo "🔌 Socket: /tmp/mysql.sock"
    echo "🌐 Port: 3306"
    echo ""
    echo "🔗 To connect: mysql -u root --socket=/tmp/mysql.sock"
else
    echo "❌ MySQL failed to start"
    echo "📋 Check the error log: /tmp/mysql_error.log"
fi
