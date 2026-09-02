import os
import sys
import shutil

def main():
    args = sys.argv[1:]
    command = args[0] if args else "help"
    
    current_dir = os.path.dirname(os.path.abspath(__file__))
    root_dir = os.path.dirname(current_dir)
    skill_file = os.path.join(root_dir, "SKILL.md")
    
    if not os.path.exists(skill_file):
        # Fallback if installed as package
        skill_file = os.path.join(current_dir, "SKILL.md")

    if command in ("install", "add"):
        target_dir = os.path.join(os.getcwd(), ".agents", "skills", "ramsian")
        os.makedirs(target_dir, exist_ok=True)
        target_file = os.path.join(target_dir, "SKILL.md")
        if os.path.exists(skill_file):
            shutil.copyfile(skill_file, target_file)
            print(f"✅ Installed ramsian skill into: {target_file}")
            print('💡 You can now prompt any AI agent: "Build this screen using the ramsian skill."')
        else:
            print("⚠️ SKILL.md not found in package bundle.")
    elif command in ("print", "spec"):
        if os.path.exists(skill_file):
            with open(skill_file, "r", encoding="utf-8") as f:
                print(f.read())
        else:
            print("⚠️ SKILL.md not found.")
    else:
        print("""
🏛️  ramsian — Single-Surface Design System by rezervehere
Universal Apple & Linear single-surface architecture, stroke-free controls, and fluid spring motion design system.

Usage:
  ramsian install    Install the master SKILL.md into .agents/skills/ramsian/SKILL.md
  ramsian print      Print the full SKILL.md specification to stdout
  ramsian help       Show this help message

Repository: https://github.com/xlavreniuk/ramsian
Live Showroom: https://xlavreniuk.github.io/ramsian/
""")

if __name__ == "__main__":
    main()
