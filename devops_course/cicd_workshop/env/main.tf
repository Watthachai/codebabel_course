terraform {
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  cloud {
    organization = "devops-quickstart"

    workspaces {
      name = "github-actions"
    }
  }
}

variable "do_token" {
  type        = string
  description = "The DigitalOcean Personal Access Token"
  sensitive = true
}

provider "digitalocean" {
  token = var.do_token
}

data "digitalocean_ssh_key" "terraform" {
  name = "do_terraform"
}

resource "digitalocean_droplet" "my-node" {
  image  = "docker-20-04"
  name   = "my-node"
  region = "sgp1"
  size   = "s-1vcpu-1gb"
  ssh_keys = [
    data.digitalocean_ssh_key.terraform.id
  ]
}

resource "digitalocean_project" "terraform" {
  name        = "terraform"
  description = "A project to represent terraform demo."
  purpose     = "Web Application"
  environment = "Production"
  resources = [
    "${digitalocean_droplet.my-node.urn}"
  ]
}

output "droplet_ip" {
  value = digitalocean_droplet.my-node.ipv4_address
}