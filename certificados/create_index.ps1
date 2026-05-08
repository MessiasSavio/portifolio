# Script para criar um arquivo de índice dos certificados

$certificatesIndex = @"
# 📜 Índice de Certificados por Categoria

## 🤖 Machine Learning & AI (8 certificados)
- Chatbot Development (Do Zero ao Primeiro Chatbot)
- Prompt Engineering (Engenharia de Prompts)
- Deep Learning and Neural Networks
- Python Basics for ML
- Setup and Configuration
- Introduction to AI
- Programming Logic Introduction
- Python Starter

## 📊 Data Science & Analytics (2 certificados)
- Data Science and CyberSecurity
- Math Computing Basics

## 💻 Backend Programming (86 certificados)
- Java and Object Orientation (Oracle ONE)
- Spring Boot Framework Series
- Programming Logic and Functions
- Data Structures and Collections
- API Development and Integration
- iFood Tech Bootcamp (Complete Programming Track)
- Microservices Architecture
- Database Integration (JPA)
- REST API Best Practices
- [+ 77 additional DIO certificates covering various programming topics]

## ☁️ Cloud & DevOps (3 certificados)
- Cloud Computing Fundamentals
- Git and GitHub Professional
- Version Control and Collaboration

## 🎯 Soft Skills & Career (10 certificados)
- Career Development Strategies
- Agile Management Concepts
- Entrepreneurship Fundamentals
- Focus and Productivity Techniques
- Personal Habits and Goals
- LinkedIn Professional Networking
- Learning Techniques and Methods
- Developer Thinking Patterns
- Programming Communication
- Data Modeling for Developers

## 🎨 Frontend Web (4 certificados)
- HTML5 and CSS3 Fundamentals
- Responsive Web Design
- CSS Variables and Advanced Styling
- Web Development Environment Setup

## 📈 Estatísticas Totais
- **Total:** 113 certificados
- **Período:** 2021 - 2024
- **Principais Instituições:** Alura (32), DIO (70+), Asimov (5), Descomplica (5), Oracle, iFood
- **Foco Principal:** Backend Development, Machine Learning, Data Science

## 🎯 Alinhamento com Objetivos Profissionais
Esta coleção de certificados está estrategicamente alinhada com as seguintes posições:

1. **🧠 Machine Learning Engineer** - 8 certificados específicos
2. **🧭 Data Engineer** - Certificados de backend + data science
3. **🤖 MLOps Engineer** - Cloud + ML + DevOps
4. **📊 Data Scientist** - Data science + programming + math

"@

$certificatesIndex | Out-File -FilePath "CERTIFICADOS_INDEX.md" -Encoding UTF8

Write-Host "Índice de certificados criado com sucesso!"