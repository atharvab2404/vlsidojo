import matplotlib.pyplot as plt
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch

# Step list with emojis for added appeal
steps = [
    "🟢 Concept", "🔷 Architecture", "🧩 IP Selection",
    "📝 RTL Coding", "🔎 Verification", "⏩ Synthesis",
    "🛠️ DFT", "📐 Physical Design", "⏱️ Timing & Signoff",
    "🚩 Tapeout", "🏭 Fabrication", "📦 Wafer Probe & Packaging",
    "🧑‍💻 Bring-Up", "🔬 Testing", "💾 Firmware & SW",
    "🚚 Production", "💡 Launch", "⚠️ Pitfalls"
]

descriptions = [
    "Product definition", "Architecture & Microarch.", "IP & System Design",
    "RTL Design & Coding", "Verification", "RTL to Gates",
    "Design-for-Test", "Floorplan, Place, Route", "Timing Closure & Signoff",
    "Tapeout & Mask Gen.", "Fab to Silicon", "Probe & Package",
    "Post-Silicon Bring-Up", "Testing & Qualification", "Firmware, Drivers, SW",
    "Production & Supply Chain", "Commercialization", "Best Practices & Pitfalls"
]

fig, ax = plt.subplots(figsize=(20, 9))
ax.set_xlim(0, 6)
ax.set_ylim(0, 3.2)
ax.axis('off')

box_w = 0.95
box_h = 0.6
colors = ['#E0F2FE', '#C7F0DB', '#FFE6D9']
arrow_color = '#2563EB'

for i, step in enumerate(steps):
    col = i % 6
    row = 2 - (i // 6)
    x = col + 0.05
    y = row + 0.2
    color = colors[row]

    # Box
    box = FancyBboxPatch(
        (x, y), box_w, box_h,
        boxstyle="round,pad=0.04",
        linewidth=2,
        edgecolor='#0369A1',
        facecolor=color
    )
    ax.add_patch(box)

    # Step Name
    ax.text(
        x + box_w / 2, y + box_h / 2 + 0.12,
        step,
        ha='center',
        va='center',
        fontsize=20,
        fontweight='bold',
        color='#0C4A6E',
        wrap=True
    )
    # Description (smaller under step name)
    ax.text(
        x + box_w / 2, y + box_h / 2 - 0.12,
        descriptions[i],
        ha='center',
        va='center',
        fontsize=11,
        color='#075985',
        wrap=True
    )

    # Arrows
    if i < len(steps)-1:
        col_next = (i+1)%6
        row_next = 2 - ((i+1)//6)
        x2 = col_next + 0.05
        y2 = row_next + 0.2

        if row == row_next:
            # Horizontal arrow to next
            arrow = FancyArrowPatch(
                (x + box_w, y + box_h/2),
                (x2, y2 + box_h/2),
                arrowstyle='-|>',
                mutation_scale=15,
                color=arrow_color,
                linewidth=2
            )
        else:
            # Vertical down arrow from end of row
            arrow = FancyArrowPatch(
                (x + box_w/2, y),
                (x2 + box_w/2, y2 + box_h),
                arrowstyle='-|>',
                mutation_scale=18,
                color=arrow_color,
                linewidth=2
            )
        ax.add_patch(arrow)

plt.title("Modern VLSI Chip Design Flow", fontsize=26, fontweight='bold', color='#075985', pad=30)
plt.tight_layout()
plt.show()
