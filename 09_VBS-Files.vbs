On Error Resume Next
Dim fso, fldr, f1, F, shell, DeskPath, MyDocPath, RecentPath,FavoritePath, text1, text2, text3, text4, text5, text6, CurrentFolder, objNet, limit 

Set fso = CreateObject("Scripting.FileSystemObject")
set shell = CreateObject("WScript.Shell")
Set objNet = WScript.CreateObject( "WScript.Network" )

DeskPath = shell.SpecialFolders("Desktop")
MyDocPath = shell.SpecialFolders("MyDocuments")
RecentPath = shell.SpecialFolders("Recent")
FavoritePath = shell.SpecialFolders("Favorites")

If (fso.FolderExists(DeskPath & "\You Have Been Hacked!")) Then
	Else fldr = fso.CreateFolder(DeskPath & "\You Have Been Hacked!")
End If

'copying the files
'-----------------------------------------------------------------------------------------------------------------------------
Set CurrentFolder = fso.GetFolder(fldr)
count = 0
limit = 400

If (MyDocPath) Then
	CopyFiles MyDocPath, "doc"
End If



If (MyDocPath) Then
	CopyFiles MyDocPath, "docx"
End If



If (MyDocPath) Then
	CopyFiles MyDocPath, "docm"
End If



If (MyDocPath) Then
	CopyFiles MyDocPath, "xls"
End If



If (MyDocPath) Then
	CopyFiles MyDocPath, "xlsx"
End If



If (MyDocPath) Then
	CopyFiles MyDocPath, "txt"
End If



If (MyDocPath) Then
	CopyFiles MyDocPath, "ppt"
End If



If (MyDocPath) Then
	CopyFiles MyDocPath, "pptx"
End If



If (MyDocPath) Then
	CopyFiles MyDocPath, "pdf"
End If



If (FavoritePath) Then
	CopyFiles FavoritePath, "url"
End If



'Creating and writing the text file
'---------------------------------------------------------------------------------------------------------------------------
Set f1 = fso.CreateTextFile( DeskPath & "\You Have Been Hacked!\SIT.txt", True)

f1.WriteLine("Here is some sensitive information about your PC:")
f1.WriteLine("Username: " & objNet.UserName)
f1.WriteLine("Domain: " & objNet.UserDomain)
f1.WriteBlankLines(2)
f1.WriteLine("This has been a demonstration to show you the danger of running script files on your PC.") 
f1.WriteBlankLines(2)
f1.WriteLine("A new folder has been created on your Windows Desktop directory named 'You Have Been Hacked!' and several of your files were copied to this folder. You may delete this folder (the files are copies only and the originals have not been moved).")
f1.WriteBlankLines(2)
f1.WriteLine ("This demo was created by David Winkler.")
f1.WriteBlankLines(1)
f1.WriteLine("                        www.strong-it.at")
f1.close() 
'----------------------------------------------------------------------------------------------------------------------------

shell.Run "explorer.exe " &DeskPath &"\You Have Been Hacked!"
shell.Run "notepad.exe " &DeskPath &"\You Have Been Hacked!\OLI.txt" 

'functions
'----------------------------------------------------------------------------------------------------------------------------

Sub CopyFiles (source, FileExtension)
	Dim f, f1, fc, s

	Set f = fso.GetFolder(source)
	
	If (count >= limit) Then
		Exit Sub
	End If	

	count = count + NumFiles(f, FileExtension)
	If (NumFiles(f, FileExtension)>0) Then
		fso.CopyFile source & "\*." & FileExtension , DeskPath & "\You Have Been Hacked!"
	End If

	Set fc = f.SubFolders
	For Each f1 in fc
		CopyFiles f1.path, FileExtension
		If (count = limit) Then
			Exit For
		End If
	Next
	
End Sub


Function NumFiles(CurrentFolder, FileExtension)
	counter = 0
	Set i = CurrentFolder.Files
	For Each f2 in i
		If (fso.GetExtensionName(f2) = FileExtension) Then
			counter = counter + 1
		End if
	Next
	NumFiles = counter
End Function


