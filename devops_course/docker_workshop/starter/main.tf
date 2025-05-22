terraform {
    required_providers {
        digitalocean = {
            source  = "digitalocean/digitalocean"
            version = "~> 2.41.0"  # More recent version as of 2025
        }
    }
    required_version = ">= 1.0.0"
}

variable "do_token" {
    type        = string
    description = "DigitalOcean API token"
    sensitive   = true
}

provider "digitalocean" {
    token = var.do_token
}

data "digitalocean_ssh_key" "terraform" {
    name = "do_terraform"
}

resource "digitalocean_droplet" "my-node" {
    image  = "docker-22-04"  # Updated to Ubuntu 22.04
    name   = "my-node"
    region = "sgp1"
    size   = "s-1vcpu-1gb"
    ssh_keys = [
        data.digitalocean_ssh_key.terraform.id
    ]
}

resource "digitalocean_project" "terraform" {
    name        = "terraform"
    description = "A project"
    purpose     = "Web Application"
    environment = "Production"  # Fixed spelling
    resources = [
        digitalocean_droplet.my-node.urn
    ]
}

output "droplet_ip" {
    value = digitalocean_droplet.my-node.ipv4_address
}
