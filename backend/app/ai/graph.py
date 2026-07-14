from langgraph.graph import StateGraph, END

from app.ai.nodes import analyze_interaction
from app.ai.state import InteractionState

builder = StateGraph(InteractionState)

builder.add_node(
    "analyze",
    analyze_interaction
)

builder.set_entry_point("analyze")

builder.add_edge(
    "analyze",
    END
)

graph = builder.compile()