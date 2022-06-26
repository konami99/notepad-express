db.createUser(
  {
    user: "konami99",
    pwd: "oKAy39vt6l!",
    roles: [
      {
        role: "readWrite",
        db: "mongo-dev"
      }
    ]
  }
)