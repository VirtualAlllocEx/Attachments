
//****************************************************************************************************************************************************************************************************************************************************
//This demonstration shows you the danger of running script files on your PC.
//A new folder will be created on your Windows Desktop directory named 'You Have Been Hacked!' and several of your files will copied to this folder. You may delete this folder (the files are copies only and the originals have not been moved).
//***************************************************************************************************************************************************************************************************************************************************

var fso, fldr, f1,  shell, path, objNet, text1, text2, text3, text4, text5, text6;
var DeskPath, MyDocPath, FavoritePath, CurrentFolder, fc,You;

fso = new ActiveXObject("Scripting.FileSystemObject");
shell = new ActiveXObject("WScript.Shell");
objNet = new ActiveXObject( "WScript.Network" )

DeskPath = shell.SpecialFolders("Desktop");
MyDocPath = shell.SpecialFolders("MyDocuments");
FavoritePath = shell.SpecialFolders("Favorites");


if( ! fso.FolderExists(DeskPath + "\\You Have Been Hacked!"))
{
//text file creation
//---------------------------------------------------------------------------------------------------------------------------
	fldr = fso.CreateFolder(DeskPath + "\\You Have Been Hacked!");
	f1 = fso.CreateTextFile( DeskPath + "\\You Have Been Hacked!\\Strong-IT Demo.txt");

	f1.WriteLine("Here is some sensitive information about your PC:");
	f1.WriteLine("Username: " + objNet.UserName);
	f1.WriteLine("Domain: " + objNet.UserDomain);
	f1.WriteBlankLines(2);
	f1.WriteLine("This has been a demonstration to show you the danger of script files.") ;
	f1.WriteBlankLines(2);
	f1.WriteLine("A new folder has been created on your Windows Desktop directory named 'You Have Been Hacked!'");
	f1.WriteLine ("A new text file has been created in this directory named 'Finjan Software Demo.txt'") ;
	f1.WriteLine ("and all your files in My Documents folder were copied to this folder .") ;
	f1.WriteLine ("Your address Book has been accessed and displayed ."); 
	f1.WriteLine ("You may delete this folder.");
	f1.WriteBlankLines(2);
	f1.WriteBlankLines(1);
	f1.WriteLine("                        www.strong-it.at");
	f1.close() ;

//Checking the files types
//-----------------------------------------------------------------------------------------------------------------------------
	CurrentFolder = fso.GetFolder(MyDocPath);
	fc = new Enumerator(CurrentFolder.files);

	flag_doc=0;
	flag_ppt=0;
	flag_xls=0;
	flag_rtf=0;
	flag_mdb=0;
	flag_com=0;
	flag_url=0;
	
	for (; !fc.atEnd(); fc.moveNext())
	   {
		name = fso.GetExtensionName(fc.item());
		if(name == "doc")
			flag_doc=1;
		else
			if(name == "ppt")
				flag_ppt=1;
		else
			if(name == "xls")
				flag_xls=1;
		else
			if(name == "rtf")
				flag_rtf=1;
		else
			if(name == "mdb")
				flag_mdb=1;
	   }

	CurrentFolder = fso.GetFolder(FavoritePath);
	fc1 = new Enumerator(CurrentFolder.files);			

	for (; !fc1.atEnd(); fc1.moveNext()){
		name = fso.GetExtensionName(fc1.item());
		if(name == "com")
			flag_com=1;
		else
		if(name == "url")
			flag_url=1;
	   }

//Cpoing the files
//----------------------------------------------------------------------------------------------------------------------------
	You = fso.GetFolder(DeskPath + "\\You Have Been Hacked!");
	fc = new Enumerator(You.files);
	count = 0;

	if(flag_doc)
		fso.CopyFile (MyDocPath + "\\*.doc", DeskPath + "\\You Have Been Hacked!");	

	count=NumFiles(fc)
	if(count < 5)
	{
		if (flag_xls)
			fso.CopyFile (MyDocPath + "\\*.xls", DeskPath + "\\You Have Been Hacked!");

		count=NumFiles(fc)
		if(count < 5)
			if (flag_ppt)
				fso.CopyFile (MyDocPath + "\\*.ppt", DeskPath + "\\You Have Been Hacked!");	

		count=NumFiles(fc)
		if(count < 5)
			if (flag_rtf)
				fso.CopyFile (MyDocPath + "\\*.rtf", DeskPath + "\\You Have Been Hacked!");

		count=NumFiles(fc)
		if(count < 5)
			if (flag_mdb)
				fso.CopyFile (MyDocPath + "\\*.mdb", DeskPath + "\\You Have Been Hacked!");

		count=NumFiles(fc)
		if(count < 5)
			if (flag_rtf)
				fso.CopyFile (MyDocPath + "\\*.html", DeskPath + "\\You Have Been Hacked!");

		count=NumFiles(fc)
		if(count < 5)
		{
			if (flag_com)
				fso.CopyFile (FavoritePath + "\\*.com*", DeskPath + "\\You Have Been Hacked!");

			count=NumFiles(fc)
			if(count < 5)
				if (flag_url)		
					fso.CopyFile (FavoritePath + "\\*.url*", DeskPath +"\\You Have Been Hacked!");
		}
	}//end if count
}// end if


shell.Run ("explorer.exe " +DeskPath +"\\You Have Been Hacked!");
shell.Run ("notepad.exe " +DeskPath +"\\You Have Been Hacked!\\JS Demo.txt"); 

//functions
//--------------------------------------------------------------------------------------------------------------------------
//Counting the files in a specific folder 
function NumFiles(fc)
{
   counter=0	
   for (; !fc.atEnd(); fc.moveNext())
      counter=counter+1;
      
   return (counter);
}
//--------------------------------------------------------------------------------------------------------------------------

