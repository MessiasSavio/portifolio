# Script para organizar certificados da Alura por categoria

# Certificados de Java/Backend Programming
Get-ChildItem "alura\*Java*" | Move-Item -Destination "03_Backend_Programming\"
Get-ChildItem "alura\*Spring*" | Move-Item -Destination "03_Backend_Programming\"

# Certificados de HTML/CSS/Frontend
Get-ChildItem "alura\*HTML*" | Move-Item -Destination "06_Frontend_Web\"
Get-ChildItem "alura\*CSS*" | Move-Item -Destination "06_Frontend_Web\"

# Certificados de Git/GitHub (DevOps)
Get-ChildItem "alura\*Git*" | Move-Item -Destination "04_Cloud_DevOps\"
Get-ChildItem "alura\*GitHub*" | Move-Item -Destination "04_Cloud_DevOps\"

# Certificados de Lógica de Programação
Get-ChildItem "alura\*Lógica*" | Move-Item -Destination "03_Backend_Programming\"

# Certificados de Soft Skills e Carreira
Get-ChildItem "alura\*carreira*" | Move-Item -Destination "05_Soft_Skills_Career\"
Get-ChildItem "alura\*Empreendedorismo*" | Move-Item -Destination "05_Soft_Skills_Career\"
Get-ChildItem "alura\*Foco*" | Move-Item -Destination "05_Soft_Skills_Career\"
Get-ChildItem "alura\*Gestão*" | Move-Item -Destination "05_Soft_Skills_Career\"
Get-ChildItem "alura\*Hábitos*" | Move-Item -Destination "05_Soft_Skills_Career\"
Get-ChildItem "alura\*LinkedIn*" | Move-Item -Destination "05_Soft_Skills_Career\"
Get-ChildItem "alura\*Transição*" | Move-Item -Destination "05_Soft_Skills_Career\"
Get-ChildItem "alura\*aprender*" | Move-Item -Destination "05_Soft_Skills_Career\"

# Certificados de Formação
Get-ChildItem "alura\*Formação*" | Move-Item -Destination "03_Backend_Programming\"

Write-Host "Organização dos certificados da Alura concluída!"