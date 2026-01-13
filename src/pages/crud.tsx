import {useState, useEffect} from "react"
import CodeMirror from "@uiw/react-codemirror"
import {javascript} from "@codemirror/lang-javascript"
import {EditorView} from "@codemirror/view"
import Header from "../components/header"

export default function Crud() {
	const [items, setItems] = useState([])
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [loading, setLoading] = useState(false)
	const [getInput, setGetInput] = useState("")
	const [deleteInput, setDeleteInput] = useState("")
	const [updateId, setUpdateId] = useState("")
	const [updateName, setUpdateName] = useState("")
	const [updateEmail, setUpdateEmail] = useState("")
	const [createId, setCreateId] = useState("")
	const [requestFormat, setRequestFormat] = useState(null) // store fetch vs axios

	const api = "https://68dae44023ebc87faa3188a9.mockapi.io/api/v1/users"

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

	const setRequestExample = (method, url, body) => {
		let fetchCode = `fetch("${url}", {\n  method: "${method}",\n  headers: { "Content-Type": "application/json" }${body ? `,\n  body: JSON.stringify(${JSON.stringify(body, null, 2)})` : ""}\n})`

		let axiosCode = `axios.${method.toLowerCase()}("${url}"${body ? `, ${JSON.stringify(body, null, 2)}` : ""})`

		setRequestFormat({fetchCode, axiosCode})
	}

	const handleGet = async () => {
		if (!getInput) return
		setLoading(true)
		try {
			let response
			if (getInput.toLowerCase() === "all") {
				response = await fetch(api)
				const data = await response.json()
				setItems(data)
				setRequestExample("GET", api)
			} else {
				response = await fetch(`${api}/${getInput}`)
				if (!response.ok) throw new Error("Item not found")
				const data = await response.json()
				setItems([data])
				setRequestExample("GET", `${api}/${getInput}`)
			}
		} catch (err) {
			console.error(err)
			setItems([])
		} finally {
			setLoading(false)
		}
	}

	const createItem = async () => {
		if (!name || !email) return
		setLoading(true)
		try {
			const avatar = `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/${Math.floor(Math.random() * 100)}.jpg`
			const body = {name, email, avatar}
			if (createId) body.id = createId

			setRequestExample("POST", api, body)

			await fetch(api, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body),
			})
			setName("")
			setEmail("")
			setCreateId("")
			fetchItems()
		} catch (err) {
			console.error("Failed to create item:", err)
		} finally {
			setLoading(false)
		}
	}

	const handleUpdate = async () => {
		if (!updateId || !updateName || !updateEmail) return
		setLoading(true)
		try {
			const avatar = `https://cdn.jsdelivr.net/gh/faker-js/assets-person-portrait/male/512/${Math.floor(Math.random() * 100)}.jpg`
			const body = {name: updateName, email: updateEmail, avatar}

			setRequestExample("PUT", `${api}/${updateId}`, body)

			await fetch(`${api}/${updateId}`, {
				method: "PUT",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body),
			})
			setUpdateId("")
			setUpdateName("")
			setUpdateEmail("")
			fetchItems()
		} catch (err) {
			console.error("Failed to update item:", err)
		} finally {
			setLoading(false)
		}
	}

	const handleDelete = async () => {
		if (!deleteInput) return
		setLoading(true)
		try {
			setRequestExample("DELETE", `${api}/${deleteInput}`)
			await fetch(`${api}/${deleteInput}`, {method: "DELETE"})
			setDeleteInput("")
			fetchItems()
		} catch (err) {
			console.error("Failed to delete item:", err)
		} finally {
			setLoading(false)
		}
	}

	const clearAllItems = async () => {
		if (!items.length) return
		setLoading(true)
		setItems([])
		try {
			setRequestExample("DELETE", `${api}/*`, {note: "Bulk clear simulated"})
			await Promise.all(items.map((item) => fetch(`${api}/${item.id}`, {method: "DELETE"})))
		} catch (err) {
			console.error("Failed to clear items:", err)
			fetchItems()
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchItems()
	}, [])

	return (
		<div className="h-screen bg-gray-50 overflow-hidden">
			<Header
				textColor={"text-black"}
				bgColor={"bg-black"}></Header>
			<div className="font-medium text-lg p-4 h-[6%] text-center ">REST process simulation</div>

			<div className="grid grid-cols-2 grid-rows-2 h-[94%] gap-4 p-4 bg-gray-100">
				{/* Left Panel: Inputs */}
				<div className=" col-span-1 bg-white p-6 shadow-md rounded ">
					<div className="font-medium text-lg pb-4">Enter details here to test CRUD operations</div>
					<div className=" flex flex-col gap-4 h-[80%] overflow-y-auto ">
						{/* CREATE input */}
						<div className="flex gap-4 w-full lg:bg-white  md:bg-green-100 lg:p-0 lg:py-2  md:p-4 sm:flex-col md:flex-col lg:flex-row  ">
							<input
								type="text"
								placeholder="Optional ID"
								value={createId}
								onChange={(e) => setCreateId(e.target.value)}
								className="border p-2 rounded flex-1"
							/>
							<input
								type="text"
								placeholder="Enter name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="border p-2 rounded flex-1"
							/>
							<input
								type="text"
								placeholder="Enter email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="border p-2 rounded flex-1"
							/>
							<button
								onClick={createItem}
								className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-32">
								Create
							</button>
						</div>

						{/* GET input */}
						<div className="flex gap-4 w-full  lg:bg-white  md:bg-blue-100 lg:p-0 lg:py-2  md:p-4 sm:flex-col md:flex-col lg:flex-row  ">
							<input
								type="text"
								placeholder="Enter 'all' or ID"
								value={getInput}
								onChange={(e) => setGetInput(e.target.value)}
								className="border p-2 rounded flex-1"
							/>
							<button
								onClick={handleGet}
								className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-32">
								Read
							</button>
						</div>

						{/* UPDATE input */}
						<div className="flex gap-4 w-full  lg:bg-white  md:bg-amber-100 lg:p-0 lg:py-2  md:p-4  sm:flex-col md:flex-col lg:flex-row ">
							<input
								type="text"
								placeholder="Enter ID to update"
								value={updateId}
								onChange={(e) => setUpdateId(e.target.value)}
								className="border p-2 rounded flex-1"
							/>
							<input
								type="text"
								placeholder="New name"
								value={updateName}
								onChange={(e) => setUpdateName(e.target.value)}
								className="border p-2 rounded flex-1"
							/>
							<input
								type="text"
								placeholder="New email"
								value={updateEmail}
								onChange={(e) => setUpdateEmail(e.target.value)}
								className="border p-2 rounded flex-1"
							/>
							<button
								onClick={handleUpdate}
								className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded w-32">
								Update
							</button>
						</div>

						{/* DELETE input */}
						<div className="flex gap-4 w-full   lg:bg-white  md:bg-red-100 lg:p-0 lg:py-2  md:p-4 sm:flex-col md:flex-col lg:flex-row ">
							<input
								type="text"
								placeholder="Enter ID to delete"
								value={deleteInput}
								onChange={(e) => setDeleteInput(e.target.value)}
								className="border p-2 rounded flex-1"
							/>
							<button
								onClick={handleDelete}
								className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-32">
								Delete
							</button>
						</div>

						{/* CLEAR ALL */}
						{/* <button
							onClick={clearAllItems}
							className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-32 mt-4">
							Clear All
						</button> */}
					</div>
				</div>

				{/* Right Panel: Request format */}
				<div className=" col-span-1 bg-white p-6 shadow-md rounded ">
					<div className="font-medium text-lg pb-4">Request Format</div>
					{requestFormat ? (
						<div className="grid grid-cols-2 gap-4 h-[83%]">
							<div>
								<div className="font-semibold mb-2">Fetch (JS)</div>
								<CodeMirror
									value={requestFormat.fetchCode || ""}
									height="200px"
									extensions={[javascript(), EditorView.lineWrapping]}
									theme="dark"
									editable={false} // ✅ makes it read-only
									basicSetup={{
										lineNumbers: false,
										foldGutter: false,
										highlightActiveLine: false,
									}}
								/>
							</div>
							<div>
								<div className="font-semibold mb-2">Axios</div>
								<CodeMirror
									value={requestFormat.axiosCode || ""}
									height="200px"
									extensions={[javascript(), EditorView.lineWrapping]}
									theme="dark"
									editable={false} // ✅ makes it read-only
									basicSetup={{
										lineNumbers: false,
										foldGutter: false,
										highlightActiveLine: false,
									}}
								/>
								{/* <pre className="bg-gray-100 p-4 rounded h-full overflow-auto text-sm">{requestFormat.axiosCode}</pre> */}
							</div>
						</div>
					) : (
						<pre className="bg-gray-100 p-4 rounded h-[83%] overflow-auto">Click a CRUD button to see request</pre>
					)}
				</div>

				{/* Bottom left: Database JSON */}
				<div className=" col-span-1 bg-white p-6 shadow-md rounded ">
					<div className="font-medium text-lg pb-4">Database JSON</div>
					<pre className="bg-gray-100 p-4 text-xs rounded h-[83%] overflow-y-auto">{loading ? "Loading..." : JSON.stringify(items, null, 2)}</pre>
				</div>

				{/* Bottom right: Cards */}
				<div className=" col-span-1 bg-white p-6 shadow-md rounded ">
					<div className="font-medium text-lg pb-4">Resulting frontend sample</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto  rounded-md p-4  bg-gray-100 max-h-[83%]">
						{items.map((item) => (
							<div
								key={item.id}
								className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col items-center text-center">
								<div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-2xl font-semibold mb-4">
									{item.name
										.split(" ")
										.map((n) => n[0])
										.join("")}
								</div>

								<h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>

								<p className="text-sm text-gray-500 mb-3">{item.email}</p>

								<p className="text-xs text-gray-400">ID: {item.id}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}
