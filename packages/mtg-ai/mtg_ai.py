import os, scryfall, openai
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")
openai.api_key = os.getenv("OPENAI_API_KEY")

def card_text(c):
    return f"{c.name} {c.type_line} {c.oracle_text}"

def find_synergies(commander_name: str):
    cmd = scryfall.card.named(exact=commander_name)
    colors = cmd.color_identity
    candidates = scryfall.cards.search(q=f"legal:commander id<={colors}")[:200]
    cmd_vec = model.encode([card_text(cmd)])
    texts = [card_text(c) for c in candidates]
    vecs = model.encode(texts)
    scores = cosine_similarity(cmd_vec, vecs)[0]
    top = np.argsort(scores)[-12:][::-1]
    out = []
    for idx in top:
        c = candidates[idx]
        explain = openai.chat.completions.create(
            model="gpt-4o-mini",
            messages=[{
                "role": "user",
                "content": f"Explain in 1 short sentence why '{c.name}' synergizes with '{cmd.name}'."
            }]
        ).choices[0].message.content
        out.append({
            "name": c.name,
            "image": c.image_uris["png"],
            "synergy": explain,
            "type": "Value"
        })
    return out
