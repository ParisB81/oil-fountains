import tkinter as tk
import random

class Particle:
    def __init__(self, x, y, fountain):
        self.fountain = fountain
        self.reset(x, y)

    def reset(self, x, y):
        self.x = x + (random.random() - 0.5) * 10
        self.y = y
        self.size = random.random() * 6 + 3
        self.speed_y = -(random.random() * 8 + self.fountain.power)
        self.speed_x = (random.random() - 0.5) * 3
        self.gravity = 0.15
        self.colors = ['#1a1a1f', '#252530', '#202028', '#151518', '#2a251f', '#302a24']
        self.color = random.choice(self.colors)
        self.life = 1.0
        self.decay = random.random() * 0.005 + 0.003

    def update(self):
        self.speed_y += self.gravity
        self.x += self.speed_x
        self.y += self.speed_y
        self.life -= self.decay

        if self.y > self.fountain.y or self.life <= 0:
            self.reset(self.fountain.x, self.fountain.y)

class Fountain:
    def __init__(self, x, y, particle_count, power):
        self.x = x
        self.y = y
        self.power = power
        self.particles = [Particle(x, y, self) for _ in range(particle_count)]

    def update(self):
        for particle in self.particles:
            particle.update()

class OilFountainApp:
    def __init__(self):
        self.root = tk.Tk()
        self.root.title("Oil Fountains")

        self.width = self.root.winfo_screenwidth()
        self.height = self.root.winfo_screenheight()

        # Fullscreen borderless
        self.root.overrideredirect(True)
        self.root.geometry(f"{self.width}x{self.height}+0+0")

        # Key color for transparency (will be invisible)
        self.trans_color = '#abcdef'
        self.root.configure(bg=self.trans_color)
        self.root.wm_attributes('-transparentcolor', self.trans_color)
        self.root.attributes('-topmost', True)

        # Canvas with transparent background
        self.canvas = tk.Canvas(
            self.root,
            width=self.width,
            height=self.height,
            bg=self.trans_color,
            highlightthickness=0
        )
        self.canvas.pack()

        # Bind escape key
        self.root.bind('<Escape>', lambda e: self.cleanup())
        # Also bind clicking anywhere to close
        self.canvas.bind('<Button-1>', lambda e: self.cleanup())

        # Create fountains
        self.fountains = []
        fountain_count = min(5, self.width // 200)
        spacing = self.width // (fountain_count + 1)

        for i in range(fountain_count):
            fx = spacing * (i + 1)
            fy = self.height - 60
            particle_count = int(70 + random.random() * 30)
            power = 10 + random.random() * 5
            self.fountains.append(Fountain(fx, fy, particle_count, power))

        self.running = True
        self.animate()
        self.root.mainloop()

    def cleanup(self):
        self.running = False
        self.root.destroy()

    def animate(self):
        if not self.running:
            return

        self.canvas.delete("all")

        # Only draw the fountains and particles - NO background
        for fountain in self.fountains:
            fountain.update()

            # Draw base pool
            self.canvas.create_oval(
                fountain.x - 45, fountain.y,
                fountain.x + 45, fountain.y + 30,
                fill='#1e1e23', outline='#2a2a30'
            )

            # Draw nozzle
            self.canvas.create_rectangle(
                fountain.x - 5, fountain.y - 8,
                fountain.x + 5, fountain.y + 8,
                fill='#2a2a30', outline='#3a3a40'
            )

            # Draw particles
            for p in fountain.particles:
                if p.life > 0:
                    radius = p.size * p.life
                    if radius > 1:
                        self.canvas.create_oval(
                            p.x - radius, p.y - radius,
                            p.x + radius, p.y + radius,
                            fill=p.color, outline=''
                        )
                        # Highlight
                        hr = radius * 0.35
                        hx = p.x - radius * 0.3
                        hy = p.y - radius * 0.3
                        self.canvas.create_oval(
                            hx - hr, hy - hr,
                            hx + hr, hy + hr,
                            fill='#4a4a50', outline=''
                        )

        self.root.after(16, self.animate)

if __name__ == "__main__":
    print("Oil Fountains - Click or press Escape to exit")
    OilFountainApp()
