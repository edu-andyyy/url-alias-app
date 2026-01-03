from typing import Any

from fastapi import status
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models import User
from app.utils.hashing import verify_password


def test_register_user_success(client: TestClient, db: Session):
    payload: dict[str, Any] = {
        "username": "new_user",
        "password": "new_password",
    }

    response = client.post("/api/users", json=payload)
    assert response.status_code == status.HTTP_201_CREATED

    data: dict[str, Any] = response.json()
    assert "id" in data
    assert data["username"] == payload["username"]
    assert data["is_active"] is True
    assert "password" not in data
    assert "password_hash" not in data

    created: User | None = db.query(User).filter(User.username == payload["username"]).first()
    assert created is not None
    assert created.username == payload["username"]
    assert created.password_hash != payload["password"]
    assert verify_password(payload["password"], created.password_hash) is True


def test_register_user_duplicate_username(client: TestClient):
    payload: dict[str, Any] = {
        "username": "dup_user",
        "password": "dup_password",
    }

    first = client.post("/api/users", json=payload)
    assert first.status_code == status.HTTP_201_CREATED

    second = client.post("/api/users", json=payload)
    assert second.status_code == status.HTTP_400_BAD_REQUEST
    assert "already exists" in second.json()["detail"]


def test_register_user_validation_error(client: TestClient):
    response = client.post("/api/users", json={"username": "only_username"})
    assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
