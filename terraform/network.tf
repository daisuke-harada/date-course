resource "aws_vpc" "main" {
  cidr_block = "10.0.0.0/16"

  enable_dns_hostnames = true

  tags = {
    Name = "dateCourse-vpc"
  }
}

resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "dateCourse-igw"
  }
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route" "public" {
  route_table_id = aws_route_table.public.id

  gateway_id = aws_internet_gateway.main.id

  destination_cidr_block = "0.0.0.0/0"
}

resource "aws_subnet" "public1" {
  vpc_id = aws_vpc.main.id

  cidr_block = "10.0.1.0/24"

  map_public_ip_on_launch=true

  availability_zone = "ap-northeast-1a"

  tags = {
    Name = "dateCourse-public-subnet-1"
  }
}

resource "aws_subnet" "public2" {
  vpc_id = aws_vpc.main.id

  cidr_block = "10.0.2.0/24"

  map_public_ip_on_launch=true

  availability_zone = "ap-northeast-1c"

  tags = {
    Name = "dateCourse-public-subnet-2"
  }
}

resource "aws_route_table_association" "public1" {
  subnet_id = aws_subnet.public1.id
  route_table_id = aws_route_table.public.id
}

resource "aws_route_table_association" "public2" {
  subnet_id = aws_subnet.public2.id
  route_table_id = aws_route_table.public.id
}