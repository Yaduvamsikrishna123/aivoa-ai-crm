from langchain_core.messages import SystemMessage, HumanMessage

from app.ai.llm import llm
from app.ai.prompts import SYSTEM_PROMPT


def analyze_interaction(state):
    notes = state["notes"]

    result = llm.invoke(
        [
            SystemMessage(content=SYSTEM_PROMPT),
            HumanMessage(content=notes),
        ]
    )

    return {
    "notes": notes,
    "summary": result.summary,
    "sentiment": result.sentiment,
    "follow_up": result.follow_up,
    "entities": result.entities,
}