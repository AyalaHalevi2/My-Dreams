# Dream API Documentation (Updated)

Below is the improved and standardized API documentation for your Dream App, following the style you requested.
Each route now uses the `{path METHOD {body}->{response}}` format, and all functions are elaborated similarly to your `fetchRegister` example.

---

## 📘 API Table Overview

| Route                 | Method | Body                                       | Returns                   |
| --------------------- | ------ | ------------------------------------------ | ------------------------- |
| /dreams/add           | POST   | `{title, content, moods[], clarity, date}` | `{error, success, dream}` |
| /dreams/get-all       | GET    | `{}`                                       | `{error, dreams[]}`       |
| /dreams/delete/:id    | DELETE | `{id}`                                     | `{error, success}`        |
| /words/check-if-exist | POST   | `{word}`                                   | `{error, exist}`          |
| /auth/register        | POST   | `{name, email, password}`                  | `{error, success}`        |

## 🌙 **Dreams API**

### **1. /dreams/add**

**POST** `{title:String, content:String, moods:String[], clarity:Number, date:String} -> {error:String, success:boolean, dream:Dream}`

Adds a new dream to the system.

#### **Client Function**

```ts
export async function fetchAddDream(dream) {
  try {
    const response = await fetch(`${PATH}/api/dreams/add`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dream),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.error || 'Failed to add dream');
      throw new Error(data.error || 'Failed to add dream');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

---

### **2. /dreams/get-all**

**GET** `{} -> {error:String, dreams:Dream[]}`

Fetches the entire dream list.

#### **Client Function**

```ts
export async function fetchAllDreams() {
  try {
    const response = await fetch(`${PATH}/api/dreams/get-all`, {
      method: 'GET',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to fetch dreams');
    }

    return data.dreams;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

---

### **3. /dreams/delete/:id**

**DELETE** `{id:String} -> {error:String, success:boolean}`

Deletes a specific dream.

#### **Client Function**

```ts
export async function fetchDeleteDream(id: string) {
  try {
    const response = await fetch(`${PATH}/api/dreams/delete/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to delete dream');
    }

    return data.success;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

---

### **4. /words/check-if-exist**

**POST** `{word:String} -> {error:String, exist:boolean}`

Checks if a specific word exists in the system.

#### **Client Function**

```ts
export async function fetchCheckWord(word: string) {
  try {
    const response = await fetch(`${PATH}/api/words/check-if-exist`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ word }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to check word');
    }

    return data.exist;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

---

### **5. /auth/register**

**POST** `{name:String, email:String, password:String} -> {error:String, success:boolean}`

Registers a new user.

#### **Client Function**

```ts
export async function fetchRegister(name: string, email: string, password: string) {
  try {
    const response = await fetch(`${PATH}/api/auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(data.message || 'Registration failed');
      throw new Error(data.message || 'Registration failed');
    }

    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
```

---

If you want, I can also add:
✅ update routes
✅ dream analysis routes
✅ mood statistics routes
✅ or convert everything into TypeScript interfaces & enums.

Just tell me!
