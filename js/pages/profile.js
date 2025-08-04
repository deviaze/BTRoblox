// BTRoblox Profile Enhancement - Classic Layout
// This script enhances Roblox profiles with the classic two-column layout

console.log("🚀 BTRoblox Profile Enhancement Starting...")

// Hook into AngularJS to modify the profile page
const originalLayoutService = window.layoutService
window.layoutService = function(target, thisArg, args, argsMap) {
	console.log("🎯 Layout Service Hooked - Target:", target)
	
	// Call original function
	const result = originalLayoutService.call(this, target, thisArg, args, argsMap)
	
	// Check if this is a profile page
	if (window.location.pathname.includes('/users/') && window.location.pathname.includes('/profile')) {
		console.log("📄 Profile page detected, applying classic layout...")
		setTimeout(() => applyClassicProfileLayout(), 1000)
	}
	
	return result
}

// Main function to apply classic Roblox profile layout
function applyClassicProfileLayout() {
	console.log("🎨 Applying Classic Roblox Profile Layout...")
	
	// Extract user ID from URL
	const userId = window.location.pathname.match(/\/users\/(\d+)\/profile/)?.[1]
	console.log("👤 User ID:", userId)
	
	if (!userId) {
		console.error("❌ Could not extract user ID from URL")
		return
	}
	
	// Wait for Roblox content to load
	waitForRobloxContent(userId)
}

// Wait for Roblox content to be available
function waitForRobloxContent(userId) {
	console.log("⏳ Waiting for Roblox content to load...")
	
	let attempts = 0
	const maxAttempts = 20
	
	const checkContent = () => {
		attempts++
		console.log(`🔍 Content check attempt ${attempts}/${maxAttempts}`)
		
		// Look for profile content
		const profileContent = document.querySelector('[class*="profile"], [class*="about"], [class*="avatar"], [class*="favorite"], [class*="badge"]')
		
		if (profileContent) {
			console.log("✅ Found profile content:", profileContent.className)
			createClassicLayout(userId)
			return
		}
		
		if (attempts >= maxAttempts) {
			console.log("⚠️ Max attempts reached, forcing layout...")
			forceClassicLayout(userId)
			return
		}
		
		setTimeout(checkContent, 500)
	}
	
	checkContent()
}

// Create the classic two-column layout
function createClassicLayout(userId) {
	console.log("🏗️ Creating Classic Two-Column Layout...")
	
	// Find the main content container
	const mainContainer = document.querySelector('main, #content, [class*="content"]') || document.body
	console.log("📦 Main container:", mainContainer.tagName, mainContainer.className)
	
	// Create the classic layout wrapper
	const classicWrapper = document.createElement('div')
	classicWrapper.className = 'btr-classic-profile'
	classicWrapper.style.cssText = `
		display: flex !important;
		flex-direction: row !important;
		gap: 20px !important;
		max-width: 1200px !important;
		margin: 0 auto !important;
		padding: 20px !important;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
		align-items: flex-start !important;
	`
	
	// Create left column (About, Stats, Badges)
	const leftColumn = document.createElement('div')
	leftColumn.className = 'btr-left-column'
	leftColumn.style.cssText = `
		flex: 1 !important;
		min-width: 300px !important;
		max-width: 50% !important;
		background: rgba(0, 0, 0, 0.2) !important;
		border-radius: 8px !important;
		padding: 20px !important;
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		display: inline-block !important;
		vertical-align: top !important;
	`
	
	// Create right column (Experiences, Favorites, Currently Wearing)
	const rightColumn = document.createElement('div')
	rightColumn.className = 'btr-right-column'
	rightColumn.style.cssText = `
		flex: 1 !important;
		min-width: 300px !important;
		max-width: 50% !important;
		background: rgba(0, 0, 0, 0.2) !important;
		border-radius: 8px !important;
		padding: 20px !important;
		border: 1px solid rgba(255, 255, 255, 0.1) !important;
		display: inline-block !important;
		vertical-align: top !important;
	`
	
	console.log("📋 Created layout columns")
	
	// Move existing content to appropriate columns
	moveContentToColumns(leftColumn, rightColumn, userId)
	
	// Add columns to wrapper
	classicWrapper.appendChild(leftColumn)
	classicWrapper.appendChild(rightColumn)
	
	// Replace or append the wrapper
	const existingContent = mainContainer.querySelector('.btr-classic-profile')
	if (existingContent) {
		existingContent.replaceWith(classicWrapper)
		console.log("🔄 Replaced existing classic layout")
	} else {
		mainContainer.appendChild(classicWrapper)
		console.log("➕ Added classic layout to page")
	}
	
	console.log("✅ Classic layout created successfully!")
}

// Move existing content to the appropriate columns
function moveContentToColumns(leftColumn, rightColumn, userId) {
	console.log("📦 Moving content to classic columns...")
	
	// Find all profile sections - expanded selectors to catch more content
	const sections = document.querySelectorAll(`
		[class*="about"], [class*="avatar"], [class*="badge"], [class*="stat"], [class*="favorite"], [class*="game"], [class*="wear"], [class*="connection"], [class*="community"],
		[class*="profile"], [class*="experience"], [class*="thumbnail"], [class*="description"],
		[id*="about"], [id*="avatar"], [id*="badge"], [id*="stat"], [id*="favorite"], [id*="game"], [id*="wear"], [id*="connection"], [id*="community"],
		[id*="profile"], [id*="experience"], [id*="thumbnail"], [id*="description"],
		section, article, div[role="main"], div[role="article"]
	`)
	
	console.log(`🔍 Found ${sections.length} sections to organize`)
	
	sections.forEach((section, index) => {
		const sectionText = section.textContent || ""
		const sectionClass = section.className || ""
		const sectionId = section.id || ""
		
		console.log(`📋 Section ${index + 1}:`, {
			class: sectionClass,
			id: sectionId,
			text: sectionText.substring(0, 50) + "..."
		})
		
		// Determine which column this section belongs in
		let targetColumn = null
		let reason = ""
		
		// Left column: About (with avatar), Statistics, Badges, Groups
		if (sectionText.includes("About") || 
			sectionText.includes("Join Date") || 
			sectionText.includes("Place Visits") || 
			sectionText.includes("Previous usernames") || 
			sectionText.includes("Player Badges") || 
			sectionText.includes("Groups") ||
			sectionText.includes("Statistics") ||
			sectionClass.includes("about") ||
			sectionClass.includes("stat") ||
			sectionClass.includes("badge") ||
			sectionClass.includes("group") ||
			sectionClass.includes("avatar") ||
			sectionId.includes("about") ||
			sectionId.includes("stat") ||
			sectionId.includes("avatar")) {
			targetColumn = leftColumn
			reason = "About/Stats/Badges/Avatar"
			console.log("🎯 LEFT COLUMN: About section with avatar detected")
		}
		// Right column: Experiences, Favorites, Currently Wearing, Connections
		else if (sectionText.includes("Currently Wearing") ||
				 sectionText.includes("Favorites") ||
				 sectionText.includes("Experiences") ||
				 sectionText.includes("Connections") ||
				 sectionText.includes("Games") ||
				 sectionClass.includes("favorite") ||
				 sectionClass.includes("game") ||
				 sectionClass.includes("wear") ||
				 sectionClass.includes("connection") ||
				 sectionClass.includes("experience") ||
				 sectionId.includes("favorite") ||
				 sectionId.includes("game") ||
				 sectionId.includes("experience")) {
			targetColumn = rightColumn
			reason = "Experiences/Favorites/Wearing"
			console.log("🎮 RIGHT COLUMN: Experiences/Games detected")
		}
		// Default: put in right column
		else {
			targetColumn = rightColumn
			reason = "Default"
		}
		
		// Move the section to the target column
		if (targetColumn) {
			targetColumn.appendChild(section.cloneNode(true))
			console.log(`➡️ Moved to ${targetColumn.className.includes('left') ? 'LEFT' : 'RIGHT'} column (${reason}):`, sectionText.substring(0, 30))
		}
	})
	
	// Add section headers and styling
	addClassicStyling(leftColumn, rightColumn)
	
	// Ensure avatar is in left column
	ensureAvatarInLeftColumn(leftColumn, rightColumn)
	
	// Ensure experiences are in right column
	ensureExperiencesInRightColumn(leftColumn, rightColumn)
	
	// Add dropdown functionality to game names
	addGameDropdowns(rightColumn, userId)
	
	console.log("✅ Content organization complete!")
	console.log(`📊 Left column: ${leftColumn.children.length} sections`)
	console.log(`📊 Right column: ${rightColumn.children.length} sections`)
}

// Ensure avatar elements are in the left column
function ensureAvatarInLeftColumn(leftColumn, rightColumn) {
	console.log("🖼️ Ensuring avatar is in left column...")
	
	// Look for avatar elements in right column and move them to left
	const avatarElements = rightColumn.querySelectorAll('[class*="avatar"], [id*="avatar"], img[src*="avatar"], [class*="profile-image"], [class*="user-image"]')
	
	avatarElements.forEach(avatar => {
		console.log("🔄 Moving avatar element to left column:", avatar.className || avatar.id)
		leftColumn.appendChild(avatar)
	})
	
	// Also look for About sections in right column and move them to left
	const aboutElements = rightColumn.querySelectorAll('[class*="about"], [id*="about"], [class*="description"]')
	
	aboutElements.forEach(about => {
		const aboutText = about.textContent || ""
		if (aboutText.includes("About") || aboutText.includes("Join Date") || aboutText.includes("Place Visits")) {
			console.log("🔄 Moving About section to left column:", aboutText.substring(0, 30))
			leftColumn.appendChild(about)
		}
	})
	
	console.log("✅ Avatar placement verification complete!")
}

// Ensure experiences are in the right column
function ensureExperiencesInRightColumn(leftColumn, rightColumn) {
	console.log("🎮 Ensuring experiences are in right column...")
	
	// Look for experience/game elements in left column and move them to right
	const experienceElements = leftColumn.querySelectorAll('[class*="game"], [class*="experience"], [class*="favorite"], [id*="game"], [id*="experience"], [id*="favorite"]')
	
	experienceElements.forEach(exp => {
		const expText = exp.textContent || ""
		if (expText.includes("Experience") || expText.includes("Game") || expText.includes("Play") || expText.includes("Visits")) {
			console.log("🔄 Moving experience element to right column:", expText.substring(0, 30))
			rightColumn.appendChild(exp)
		}
	})
	
	// Also look for any game thumbnails or cards
	const gameCards = leftColumn.querySelectorAll('[class*="card"], [class*="thumbnail"], [class*="thumb"]')
	gameCards.forEach(card => {
		const cardText = card.textContent || ""
		if (cardText.includes("Playing") || cardText.includes("Visits") || cardText.includes("favorites")) {
			console.log("🔄 Moving game card to right column:", cardText.substring(0, 30))
			rightColumn.appendChild(card)
		}
	})
	
	console.log("✅ Experience placement verification complete!")
}

// Add dropdown functionality to game names
function addGameDropdowns(rightColumn, userId) {
	console.log("🎮 Adding dropdown functionality to game names...")
	
	// Find all game names in the right column
	const gameNames = rightColumn.querySelectorAll('[class*="game-name"], [class*="experience-name"], [class*="card-name"], .game-card-name, .text-overflow')
	
	gameNames.forEach((gameName, index) => {
		const gameText = gameName.textContent || ""
		if (gameText.trim() && !gameText.includes("About") && !gameText.includes("Statistics")) {
			console.log(`🎯 Adding dropdown to game: ${gameText}`)
			
			// Create dropdown container
			const dropdownContainer = document.createElement('div')
			dropdownContainer.className = 'btr-game-dropdown-container'
			dropdownContainer.style.cssText = `
				position: relative !important;
				display: inline-block !important;
			`
			
			// Make the game name clickable
			gameName.style.cssText += `
				cursor: pointer !important;
				color: #00a2ff !important;
				text-decoration: underline !important;
				transition: color 0.2s ease !important;
			`
			
			// Add hover effect
			gameName.addEventListener('mouseenter', () => {
				gameName.style.color = '#ffffff !important'
			})
			
			gameName.addEventListener('mouseleave', () => {
				gameName.style.color = '#00a2ff !important'
			})
			
			// Create dropdown content
			const dropdownContent = document.createElement('div')
			dropdownContent.className = 'btr-game-dropdown-content'
			dropdownContent.style.cssText = `
				display: none !important;
				position: absolute !important;
				background: rgba(0, 0, 0, 0.9) !important;
				min-width: 200px !important;
				box-shadow: 0 8px 16px rgba(0,0,0,0.5) !important;
				z-index: 1000 !important;
				border-radius: 6px !important;
				border: 1px solid rgba(255, 255, 255, 0.1) !important;
				padding: 10px !important;
				top: 100% !important;
				left: 0 !important;
			`
			
			// Add dropdown content
			dropdownContent.innerHTML = `
				<div style="color: #ffffff; font-weight: bold; margin-bottom: 8px;">${gameText}</div>
				<div style="color: #cccccc; font-size: 12px; margin-bottom: 8px;">Game Details</div>
				<button class="btr-dropdown-play-btn" style="
					background: #00a2ff !important;
					color: white !important;
					border: none !important;
					border-radius: 4px !important;
					padding: 6px 12px !important;
					cursor: pointer !important;
					margin-right: 8px !important;
					font-size: 12px !important;
				">Play</button>
				<button class="btr-dropdown-favorite-btn" style="
					background: #ff6b6b !important;
					color: white !important;
					border: none !important;
					border-radius: 4px !important;
					padding: 6px 12px !important;
					cursor: pointer !important;
					font-size: 12px !important;
				">Favorite</button>
			`
			
			// Add click event to show/hide dropdown
			gameName.addEventListener('click', (e) => {
				e.preventDefault()
				e.stopPropagation()
				
				// Hide all other dropdowns
				document.querySelectorAll('.btr-game-dropdown-content').forEach(dd => {
					dd.style.display = 'none'
				})
				
				// Toggle this dropdown
				if (dropdownContent.style.display === 'none' || !dropdownContent.style.display) {
					dropdownContent.style.display = 'block'
					console.log(`📋 Showing dropdown for: ${gameText}`)
				} else {
					dropdownContent.style.display = 'none'
				}
			})
			
			// Add dropdown to container
			dropdownContainer.appendChild(gameName.cloneNode(true))
			dropdownContainer.appendChild(dropdownContent)
			
			// Replace original game name with dropdown container
			gameName.parentNode.replaceChild(dropdownContainer, gameName)
		}
	})
	
	// Close dropdowns when clicking outside
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.btr-game-dropdown-container')) {
			document.querySelectorAll('.btr-game-dropdown-content').forEach(dd => {
				dd.style.display = 'none'
			})
		}
	})
	
	console.log("✅ Game dropdown functionality added!")
}

// Add classic Roblox styling
function addClassicStyling(leftColumn, rightColumn) {
	console.log("🎨 Applying classic Roblox styling...")
	
	// Style section headers
	const headers = document.querySelectorAll('h2, h3, [class*="title"], [class*="header"]')
	headers.forEach(header => {
		header.style.cssText += `
			color: #ffffff;
			font-size: 18px;
			font-weight: bold;
			margin-bottom: 15px;
			padding-bottom: 5px;
			border-bottom: 2px solid #00a2ff;
		`
	})
	
	// Style sections
	const sections = document.querySelectorAll('[class*="about"], [class*="avatar"], [class*="badge"], [class*="stat"], [class*="favorite"], [class*="game"], [class*="wear"], [class*="connection"], [class*="community"]')
	sections.forEach(section => {
		section.style.cssText += `
			margin-bottom: 20px;
			padding: 15px;
			background: rgba(255, 255, 255, 0.05);
			border-radius: 6px;
			border: 1px solid rgba(255, 255, 255, 0.1);
		`
	})
	
	console.log("✅ Classic styling applied!")
}

// Fallback function to force layout
function forceClassicLayout(userId) {
	console.log("🔄 Forcing classic layout...")
	
	// Create a simple two-column layout
	const container = document.querySelector('main, #content') || document.body
	
	const wrapper = document.createElement('div')
	wrapper.className = 'btr-classic-profile-forced'
	wrapper.style.cssText = `
		display: flex;
		gap: 20px;
		padding: 20px;
		max-width: 1200px;
		margin: 0 auto;
	`
	
	const leftCol = document.createElement('div')
	leftCol.style.cssText = 'flex: 1; background: rgba(0,0,0,0.2); padding: 20px; border-radius: 8px;'
	
	const rightCol = document.createElement('div')
	rightCol.style.cssText = 'flex: 1; background: rgba(0,0,0,0.2); padding: 20px; border-radius: 8px;'
	
	// Move all content to columns
	const allContent = Array.from(container.children)
	allContent.forEach((child, index) => {
		if (index % 2 === 0) {
			leftCol.appendChild(child.cloneNode(true))
		} else {
			rightCol.appendChild(child.cloneNode(true))
		}
	})
	
	wrapper.appendChild(leftCol)
	wrapper.appendChild(rightCol)
	container.appendChild(wrapper)
	
	console.log("✅ Forced classic layout created!")
}

// Enhanced debugging
console.log("🔧 BTRoblox Profile Enhancement Loaded!")
console.log("📄 Current URL:", window.location.href)
console.log("🎯 Waiting for profile page...")

// Auto-detect profile page on load
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', () => {
		if (window.location.pathname.includes('/users/') && window.location.pathname.includes('/profile')) {
			console.log("📄 Profile page detected on DOM load")
			setTimeout(() => applyClassicProfileLayout(), 2000)
		}
	})
} else {
	if (window.location.pathname.includes('/users/') && window.location.pathname.includes('/profile')) {
		console.log("📄 Profile page detected on script load")
		setTimeout(() => applyClassicProfileLayout(), 2000)
	}
}