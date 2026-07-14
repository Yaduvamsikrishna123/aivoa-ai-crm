from typing import TypedDict


class InteractionState(TypedDict):
    notes: str
    summary: str
    sentiment: str
    follow_up: str
    entities: list[str]