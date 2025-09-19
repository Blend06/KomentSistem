# 💬 Sistemi i Komenteve

Një sistem i thjeshtë komentesh i ndërtuar me Next.js dhe SQLite.

## 🚀 Karakteristikat

- **Shtimi i komenteve** me titull dhe përmbajtje
- **Shfaqja e komenteve** në listë të organizuar
- **Përditësimi i komenteve** direkt nga lista
- **Fshirja e komenteve** me konfirmim
- **Design modern** dhe responsive
- **Database SQLite** për ruajtjen e të dhënave
- **API RESTful** për të gjitha operacionet

## 🛠️ Teknologjitë e përdorura

- **Next.js 14** - Framework React
- **React 18** - Library për UI
- **SQLite** - Database lokale
- **better-sqlite3** - Driver për SQLite
- **CSS3** - Styling dhe responsive design

## 📦 Instalimi

1. **Instaloni dependencies:**
   ```bash
   npm install
   ```

2. **Nisni serverin e zhvillimit:**
   ```bash
   npm run dev
   ```

3. **Hapni browserin dhe shkoni te:**
   ```
   http://localhost:3000
   ```

## 🗄️ Struktura e Database

Tabela `comments` përmban kolonat e mëposhtme:

- `id` - ID unik (AUTO_INCREMENT)
- `title` - Titulli i komentit
- `content` - Përmbajtja e komentit
- `created_at` - Data dhe ora e krijimit

## 🔧 API Endpoints

### GET /api/comments
Merr të gjitha komentet

### POST /api/comments
Krijo një koment të ri
```json
{
  "title": "Titulli i komentit",
  "content": "Përmbajtja e komentit"
}
```

### GET /api/comments/[id]
Merr një koment sipas ID

### PUT /api/comments/[id]
Përditëso një koment
```json
{
  "title": "Titulli i ri",
  "content": "Përmbajtja e re"
}
```

### DELETE /api/comments/[id]
Fshi një koment

## 🎨 Përdorimi

1. **Shtoni një koment të ri:**
   - Plotësoni titullin dhe përmbajtjen
   - Klikoni "Shto Komentin"

2. **Përditësoni një koment:**
   - Klikoni "Përditëso" pranë komentit
   - Modifikoni titullin dhe përmbajtjen
   - Klikoni "Ruaj" ose "Anulo"

3. **Fshini një koment:**
   - Klikoni "Fshi" pranë komentit
   - Konfirmoni fshirjen

## 📱 Responsive Design

Aplikacioni është i optimizuar për të gjitha pajisjet:
- Desktop
- Tablet
- Mobile

## 🔒 Siguria

- Validimi i të dhënave në frontend dhe backend
- Sanitizimi i input-it
- Error handling i plotë

## 📝 Shënime

- Database SQLite krijohet automatikisht në root directory
- Të gjitha komentet ruhen lokalisht
- Aplikacioni është gati për production me `npm run build`

## 🤝 Kontributimi

Kontributet janë të mirëpritura! Ju lutemi:
1. Fork-oni repository-n
2. Krijoni një branch të ri
3. Bëni ndryshimet tuaja
4. Dërgoni një Pull Request

## 📄 Licenca

Ky projekt është nën licencën MIT.
