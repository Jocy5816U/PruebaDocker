group "default" {
  targets = ["musica"]
}

target "musica" {
  context = "."
  dockerfile = "Dockerfile"
  tags = ["jocy712/musica:bake"]
}
