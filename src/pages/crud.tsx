import React, {useState, useEffect} from "react"

export default function Crud() {
	const [items, setItems] = useState([])
	const [name, setName] = useState("")
	const [loading, setLoading] = useState(false)

	// Replace this with your MockAPI endpoint
	const api = "https://68dae44023ebc87faa3188a9.mockapi.io/api/v1/users"

	// Fetch items
	const fetchItems = async () => {
		setLoading(true)
		try {
			const res = await fetch(api)
			const data = await res.json()
			setItems(data)
		} catch (err) {
			console.error("Failed to fetch items:", err)
		} finally {
			setLoading(false)
		}
	}

	// Create new item
	const createItem = async () => {
		if (!name) return
		setLoading(true)
		try {
			await fetch(api, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({name}),
			})
			setName("")
			fetchItems()
		} catch (err) {
			console.error("Failed to create item:", err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchItems()
	}, [])

	return (
		<div className="flex h-screen p-6 space-x-6">
			{/* Left: Form */}
			<div className="w-1/2 flex flex-col space-y-4">
				<h2 className="text-xl font-bold">Add Item</h2>
				<input
					type="text"
					placeholder="Enter item name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="border p-2 rounded"
				/>
				<button
					onClick={createItem}
					className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-32">
					Create
				</button>
			</div>

			{/* Right: Live Database JSON */}
			<div className="w-1/2">
				<h2 className="text-xl font-bold mb-2">Database JSON</h2>
				<pre className="bg-gray-100 p-4 rounded h-full overflow-auto">{loading ? "Loading..." : JSON.stringify(items, null, 2)}</pre>
			</div>
		</div>
	)
}
